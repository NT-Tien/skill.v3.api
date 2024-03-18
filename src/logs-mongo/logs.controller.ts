import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LogsService } from "./logs.service";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";

@ApiTags('logs')
@Controller('logs')
export class LogsController {
    constructor(
        @Inject('LOGS_SERVICE_TIENNT') private readonly logsService: LogsService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Get()
    async getLogs(
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return this.logsService.getLogs(page, limit);
    }
}