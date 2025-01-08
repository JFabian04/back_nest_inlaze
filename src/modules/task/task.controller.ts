import { Controller, Get, Post, Body, Param, Patch, Delete, Query, NotFoundException, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';
import { UpdateTaskDto } from './dto/update-dto';
import { QueryParams } from 'src/common/query/query.service';

@Controller('api/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    async create(@Body() createTaskDto: TaskDto) {
        await this.taskService.create(createTaskDto);
        return {
            message: 'Tarea registrada correctamente',
        };
    }

    @Get()
    async findAll(@Query() query: QueryParams) {
        return await this.taskService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
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
