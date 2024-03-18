import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Logs, LogsSchema } from "./logs.schema";
import { LogsService } from "./logs.service";
import { LogsController } from "./logs.controller";
import { AuthModule } from "src/modules/auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Logs.name, schema: LogsSchema }]),
        AuthModule,
    ],
    controllers: [LogsController],
    providers: [
        {
            provide: 'LOGS_SERVICE_TIENNT',
            useClass: LogsService,
        }
    ],
    exports: [
        {
            provide: 'LOGS_SERVICE_TIENNT',
            useClass: LogsService,
        }
    ]
})
export class LogsModule {}