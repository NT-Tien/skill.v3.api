import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

export interface ProjectServiceInterface {
    // CRUD only for admin account
    createProject(data: CreateProjectDto): Promise<any>;
    updateProject(id: string, data: UpdateProjectDto): Promise<any>;
    deleteProject(id: string): Promise<any>;
    softDeleteProject(id: string): Promise<any>;
    unDeleteProject(id: string): Promise<any>;
    getProjectById(id: string): Promise<any>;
    getProjects(): Promise<any>;
}