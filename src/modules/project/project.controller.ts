import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "../auth/guards/admin.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@ApiTags('project')
@UseGuards(AdminGuard)
@Controller('project')
export class ProjectController {
    constructor(
        @Inject('PROJECT_SERVICE_TIENNT') private projectService: ProjectService
    ) { }

    @Get()
    @ApiBearerAuth()
    async getAll() {
        return await this.projectService.getProjects();
    }

    @Get('/:id')
    @ApiBearerAuth()
    async getOne(@Param('id') id: string) {
        return await this.projectService.getProjectById(id);
    }

    @Post()
    @ApiBearerAuth()
    async create(@Body() data: CreateProjectDto) {
        return await this.projectService.createProject(data);
    }

    @Put('/:id')
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() data: UpdateProjectDto) {
        return await this.projectService.updateProject(id, data);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        return await this.projectService.softDeleteProject(id);
    }

    @Put('/undelete/:id')
    @ApiBearerAuth()
    async unDelete(@Param('id') id: string) {
        return await this.projectService.unDeleteProject(id);
    }
}