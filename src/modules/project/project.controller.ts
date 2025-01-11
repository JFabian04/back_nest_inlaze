import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectDto } from './dto/project-dto';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-dto';
import { Project } from './entities/project.entity';
import { QueryParams } from '../../common/query/query.service';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('api/projects')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) { }

    @Post()
    @Roles('admin')
    async create(@Body() createProjectDto: ProjectDto) {
        await this.projectService.create(createProjectDto);
        return {
            message: 'Proyecto registrado correctamente',
        };
    }

    @Roles('admin', 'user')
    @UseGuards(AuthGuard) 
    @Get()
    async findAll(@Query() query: QueryParams) {
        return await this.projectService.findAll(query);
    }

    @Roles('admin', 'user')
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
    @Roles('admin')
    async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        await this.projectService.update(id, updateProjectDto);
        return {
            message: 'Proyecto actualizado correctamente',
        };
    }

    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id') id: number) {
        await this.projectService.softDelete(id);
        return {
            message: 'Proyecto eliminado correctamente',
        };

    }
}
