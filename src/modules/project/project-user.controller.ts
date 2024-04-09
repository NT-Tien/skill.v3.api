import { Controller, Get, Inject, UseInterceptors } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ApiTags } from "@nestjs/swagger";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";

@ApiTags('project-user')
@UseInterceptors(CacheInterceptor)
@Controller('project-user')
export class ProjectController {
    constructor(
        @Inject('PROJECT_SERVICE_TIENNT') private projectService: ProjectService
    ) { }

    @CacheKey('custom_key')
    @CacheTTL(20)
    @Get()
    async getAll() {
        return await this.projectService.getProjects();
    }

}