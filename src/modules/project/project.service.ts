import { Injectable } from "@nestjs/common";
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
        return this.projectRepository.save(data);
    }
    updateProject(id: string, data: UpdateProjectDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteProject(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    softDeleteProject(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    unDeleteProject(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getProjectById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getProjects(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}