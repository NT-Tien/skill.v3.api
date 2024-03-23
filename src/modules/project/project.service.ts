import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectServiceInterface } from "./interface/project.interface";
import { CreateProjectDto } from "./interface/dto/create-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateProjectDto } from "./interface/dto/update-project.dto";
import { ProjectEntity } from "./entities/project.entity";

@Injectable()
export class ProjectService implements ProjectServiceInterface {
    constructor(
        @InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>
    ) { }
    async createProject(data: CreateProjectDto): Promise<any> {
        // check nameProject is exist
        var project = await this.projectRepository.findOne({ where: { projectName: data.projectName } });
        if (project) throw new HttpException('Project name is exist', HttpStatus.BAD_REQUEST);
        return this.projectRepository.save(data);
    }
    updateProject(id: string, data: UpdateProjectDto): Promise<any> {
        // check nameProject is exist
        var project = this.projectRepository.findOne({ where: { projectName: data.projectName } });
        if (project) throw new HttpException('Project name is exist', HttpStatus.BAD_REQUEST);
        return this.projectRepository.update(id, data);
    }
    deleteProject(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    softDeleteProject(id: string): Promise<any> {
        return this.projectRepository.update(id, { deletedAt: new Date() });
    }
    unDeleteProject(id: string): Promise<any> {
        return this.projectRepository.update(id, { deletedAt: null });
    }
    getProjectById(id: string): Promise<any> {
        return this.projectRepository.find({ where: { id: id } });
    }
    getProjects(): Promise<any> {
        return this.projectRepository.find(); 
    }
}