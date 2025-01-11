import { Controller, Get, Post, Body, Param, Patch, Delete, Query, NotFoundException, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';
import { UpdateTaskDto } from './dto/update-dto';
import { QueryParams } from '../../common/query/query.service';

@Controller('api/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    //Controlador para traer todas la cantidades de registros de proyectos y tareas
    @Get('stats')
    async getStats() {
            const data = await this.taskService.getStats();
            return { data: data }
    }

    @Post()
    async create(@Body() createTaskDto: TaskDto) {
        await this.taskService.create(createTaskDto);
        return {
            message: 'Tarea registrada correctamente',
        };
    }

    @Get(':project_id/:user_id')
    async findAll(
        @Param('project_id') project_id: string,
        @Param('user_id') user_id: string,
        @Query() query: QueryParams
    ) {
        const params = { ...query, project_id, user_id };

        return await this.taskService.findAll(params);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        console.log('FIN: ');
        
        try {
            const item = await this.taskService.findOne(id);
            return { data: item }
        } catch (error) {
            throw new NotFoundException(error.message || 'Registro no encontrado');
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        await this.taskService.update(id, updateTaskDto);
        return {
            message: 'Tarea actualizado correctamente',
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.taskService.softDelete(id);
        return {
            message: 'Tarea eliminada correctamente',
        };
    }
}
