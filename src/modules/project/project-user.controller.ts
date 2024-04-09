import { Controller, Get, Inject } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CacheKey, CacheTTL } from "@nestjs/cache-manager";

@ApiTags('project-user')
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