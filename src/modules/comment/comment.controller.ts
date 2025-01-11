import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment-dto';
import { UpdateCommentDto } from './dto/update-dto';
import { CommentGateway } from '../../utils/socket/comment-gateway/comment.gateway';

@Controller('api/comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly commentGateWay: CommentGateway
    ) { }

    //Controlador para registrar 
    @Post()
    async create(@Body() createCommentDto: CommentDto) {
        const comment = await this.commentService.create(createCommentDto);
        this.commentGateWay.server.emit('newComment', comment);
        return {
            message: 'Comentario enviado',
            data: comment,
        };
    }

    //Actualizar el estado de leido de un comentario
    @Patch('read/:user_id')
    async updateStatus(@Param('user_id') id: number) {
        await this.commentService.updateStatus(id);
        return {
            message: 'Comentario leído'
        }
    }

    //Obtener cantidad de comentarios no leidso por ID de usuario
    @Get('unread/:task_id/:user_id')
    async unread(@Param('user_id') user_id: number, @Param('task_id') task_id: number) {
        const resp = await this.commentService.getNotRead(task_id, user_id);
        console.log('controler data: ', resp);
        console.log('params: ',  task_id, user_id,);
        
        return {
            data: resp,
        };
    }

    //Controlador para obtener comentarios por ID de tarea
    @Get(':task_id')
    async getComments(
        @Param('task_id') taskId: string,
        @Query() query: any
    ) {
        console.log('XDXD');

        return await this.commentService.findAll({ task_id: taskId, ...query });
    }

    //controlador para obtener data de un comentario
    @Get('find/:id')
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
