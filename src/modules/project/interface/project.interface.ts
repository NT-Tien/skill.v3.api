
export interface ProjectServiceInterface {
    createProject(data: any): Promise<any>;
    updateProject(id: string, data: any): Promise<any>;
    deleteProject(id: string): Promise<any>;
    getProjectById(id: string): Promise<any>;
    getProjects(data: any): Promise<any>;
}