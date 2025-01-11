import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status, Task } from './entities/task.entity';
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
    // Validar si los usuarios asignados existen
    await existsForeignValidator(this.userRepository, createTaskDto.users, 'id', 'User');

    // Validar si el proyecto existe
    await existsForeignValidator(this.projectRepository, createTaskDto.project, 'id', 'Project');

    // Obtener las instancias completas de los usuarios
    const users = await this.userRepository.findByIds(createTaskDto.users);
    console.log('USER TASK: ', users);

    const task = this.taskRepository.create({
      ...createTaskDto,
      users,
    });

    await this.taskRepository.save(task);
  }

  async findAll(params): Promise<{ data: Task[], total: number }> {
    const user = await this.userRepository.findOne({ where: { id: params.user_id }, relations: ['rol'] })
    let joinTableFilters;
    if (user.rol.name != 'admin') {
      joinTableFilters = {
        users: params.user_id,
      };
    }

    const filters = {
      project_id: params.project_id,
    };

    return this.queryService.findWithPaginationAndFilters(
      { ...params, filters },
      this.taskRepository,
      ['users'],
      joinTableFilters ? joinTableFilters : ''
    );
  }


  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['users'], });
    if (!task) {
      throw new NotFoundException('No se encontró el registro con Id: ' + id);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    //Validar si el usuario asignado existe 
    await existsForeignValidator(this.userRepository, updateTaskDto.users, 'id');

    //Validar si el projeyecto existe 
    await existsForeignValidator(this.projectRepository, updateTaskDto.project, 'id', 'Project');

    const task = await this.findOne(id);

    // Obtener nuevas instancias de usuarios
    const users = await this.userRepository.findByIds(updateTaskDto.users);

    // Actualizar las propiedades de la tarea
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.status = updateTaskDto.status;
    task.date_limit = updateTaskDto.date_limit;
    task.project = updateTaskDto.project;

    // Actualizar la relación de usuarios de la tarea
    task.users = users;

    await this.taskRepository.save(task);

    // Eliminar las relaciones antiguas que no están en el nuevo arreglo de usuarios
    await this.taskRepository
      .createQueryBuilder()
      .relation(Task, 'users')
      .of(id) // Tarea con el id
      .addAndRemove(users, task.users);
  }

  async softDelete(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.softRemove(task);
  }

  //Servicio para retornar todos los regsitros ede projecto s tareas y cuantos hay por cada estado
  async getStats(): Promise<any> {

    // Proyectos
    const active = await this.projectRepository.count({
      where: { status: true },
    });

    const closed = await this.projectRepository.count({
      where: { status: false },
    });

    const total = await this.projectRepository.count();

    // Tareas
    const notStarted = await this.taskRepository.count({
      where: { status: Status.PorHacer }
    });

    const inProgress = await this.taskRepository.count({
      where: { status: Status.EnProgreso },
    });

    const completed = await this.taskRepository.count({
      where: { status: Status.Completada },
    });

    const totalTasksCount = await this.taskRepository.count();

    return {
      projects: {
        active,
        closed,
        total,
      },
      tasks: {
        notStarted,
        inProgress,
        completed,
        totalTasksCount,
      },
    };
  }
}
