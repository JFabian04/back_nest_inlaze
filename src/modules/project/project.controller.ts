import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ProjectDto } from './dto/project-dto';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-dto';
import { Project } from './entities/project.entity';
import { QueryParams } from 'src/common/query/query.service';

@Controller('api/projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async create(@Body() createProjectDto: ProjectDto) {
        await this.projectService.create(createProjectDto);
        return {
            message: 'Proyecto registrado correctamente',
        };
    }

    @Get()
    findAll(@Query() query: QueryParams) {
        return this.projectService.findAll(query);  // Pasar los parámetros al servicio
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        try {
            const item = await this.projectService.findOne(id);
            return { data: item }
        } catch (error) {
            throw new NotFoundException(error.message || 'Registro no encontrado');
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        await this.projectService.update(id, updateProjectDto);
        return {
            message: 'Proyecto actualizado correctamente',
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.projectService.softDelete(id);
            return {
                message: 'Proyecto eliminado correctamente',
            };
        } catch (error) {
            throw new NotFoundException(error.message || 'Registro no encontrado');
        }
    }
}
