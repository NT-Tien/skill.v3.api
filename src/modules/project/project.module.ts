import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { ProjectEntity } from "./entities/project.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([ProjectEntity]),
        AuthModule,
    ],
    providers: [
        {
            provide: 'PROJECT_SERVICE_TIENNT',
            useClass: ProjectService,
        }
    ],
    controllers: [ProjectController]
})
export class ProjectModule {}