import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectDto } from './dto/project-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from './dto/update-dto';
import { QueryService } from 'src/common/query/query.service';


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly queryService: QueryService
    ) { }

    async create(createProjectDto: ProjectDto): Promise<void> {
        const project = this.projectRepository.create(createProjectDto);
        await this.projectRepository.save(project);
    }

    async findAll(params): Promise<{ data: Project[], total: number }> {
        return await this.queryService.findWithPaginationAndFilters(params, this.projectRepository);
    }

    async findOne(id: number): Promise<Project> {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException('No se encontró el registro con Id: ' + id);
        }
        return project;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<void> {
        const project = await this.findOne(id);
        const updatedProject = this.projectRepository.merge(project, updateProjectDto);
        await this.projectRepository.save(updatedProject);
    }

    async softDelete(id: number): Promise<void> {
        const project = await this.findOne(id);

        await this.projectRepository.softRemove(project);
    }
}
