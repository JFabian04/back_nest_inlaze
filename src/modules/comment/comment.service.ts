import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { existsForeignValidator } from 'src/validators/exists-validator';
import { Task } from '../task/entities/task.entity';
import { CommentDto } from './dto/comment-dto';
import { QueryService } from 'src/common/query/query.service';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly queryService: QueryService
    ) { }

    async create(createCommentDto: CommentDto): Promise<void> {
        //Validar si el usuario asignado existe 
        await existsForeignValidator(this.userRepository, createCommentDto.user, 'id', 'User');

        //Validar si la tarea asignado existe 
        await existsForeignValidator(this.taskRepository, createCommentDto.task, 'id', 'Tarea');

        const item = this.commentRepository.create(createCommentDto);

        await this.commentRepository.save(item);
    }

    async findAll(params): Promise<{ data: Comment[], total: number }> {
        const { task_id, page = 1, limit = 10, filters, sortField, sortOrder = 'ASC' } = params;

        if (!task_id) {
            throw new Error('El parámetro "task_id" es obligatorio');
        }

        const queryBuilder = this.commentRepository.createQueryBuilder('comment');

        // Join con user
        queryBuilder.leftJoinAndSelect('comment.user', 'user');

        // Join con Task
        queryBuilder.leftJoinAndSelect('comment.task', 'task');

        queryBuilder.andWhere('comment.task_id = :task_id', { task_id });

        // Filtros adicionales
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    queryBuilder.andWhere(`comment.${key} = :${key}`, { [key]: filters[key] });
                }
            });
        }

        queryBuilder.orderBy('comment.created_at', sortOrder);

        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async findOne(id: number): Promise<Comment> {
        const data = await this.commentRepository.findOne({ where: { id } });
        if (!data) {
            throw new NotFoundException('No se encontró el registro con Id: ' + id);
        }
        return data;
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<void> {
        //Validar si el usuario asignado existe 
        await existsForeignValidator(this.userRepository, updateCommentDto.user, 'id', 'User');

        //Validar si la tarea existe 
        await existsForeignValidator(this.taskRepository, updateCommentDto.task, 'id', 'Task');

        // Realiza actualizacion
        const data = await this.findOne(id);
        const updated = this.commentRepository.merge(data, updateCommentDto);
        await this.commentRepository.save(updated);
    }

    async softDelete(id: number): Promise<void> {
        const item = await this.findOne(id);
        await this.commentRepository.softRemove(item);
    }

}
