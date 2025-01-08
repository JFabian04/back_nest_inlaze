import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { QueryService } from 'src/common/query/query.service';
import { TaskDto } from './dto/task-dto';
import { UpdateTaskDto } from './dto/update-dto';
import { User } from '../user/entities/user.entity';
import { existsForeignValidator } from 'src/validators/exists-validator';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,

    private readonly queryService: QueryService,
  ) { }


  async create(createTaskDto: TaskDto): Promise<void> {
    //Validar si el usuario asignado existe 
    await existsForeignValidator(this.userRepository, createTaskDto.user, 'id', 'User');

    //Validar si el projeyecto existe 
    await existsForeignValidator(this.projectRepository, createTaskDto.project, 'id', 'Project');

    const item = this.taskRepository.create(createTaskDto);
    console.log(item);
    await this.taskRepository.save(item);
  }

  async findAll(params): Promise<{ data: Task[], total: number }> {
    return await this.queryService.findWithPaginationAndFilters(params, this.taskRepository);
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('No se encontró el registro con Id: ' + id);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    //Validar si el usuario asignado existe 
    await existsForeignValidator(this.userRepository, updateTaskDto.user, 'id');

    //Validar si el projeyecto existe 
    await existsForeignValidator(this.projectRepository, updateTaskDto.project, 'id', 'Project');

    // Realiza actualizacion
    const task = await this.findOne(id);
    const updatedTask = this.taskRepository.merge(task, updateTaskDto);
    await this.taskRepository.save(updatedTask);
  }

  async softDelete(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.softRemove(task);
  }

}
