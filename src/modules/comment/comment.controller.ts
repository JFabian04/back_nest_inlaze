import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment-dto';
import { QueryParams } from 'src/common/query/query.service';
import { UpdateCommentDto } from './dto/update-dto';

@Controller('api/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    //Controlador para registrar 
    @Post()
    async create(@Body() createCommentDto: CommentDto) {
        await this.commentService.create(createCommentDto);
        return {
            message: 'Comentario enviado',
        };
    }
    //Controlador para obtener comentarios por ID de tarea
    @Get(':task_id')
    async getComments(
        @Param('task_id') taskId: string, 
        @Query() query: any 
    ) {
        return await this.commentService.findAll({ task_id: taskId, ...query });
    }

    //controlador para obtener data de un comentario
    @Get(':id')
    async findOne(@Param('id') id: number) {
        try {
            const item = await this.commentService.findOne(id);
            return { data: item }
        } catch (error) {
            throw new NotFoundException(error.message || 'Registro no encontrado');
        }
    }

    //actualizar registros por ID
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
        await this.commentService.update(id, updateCommentDto);
        return {
            message: 'Comentario editado',
        };
    }

    //Elimnado logico por ID
    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.commentService.softDelete(id);
        return {
            message: 'El comentario fue eliminado',
        };

    }
}
