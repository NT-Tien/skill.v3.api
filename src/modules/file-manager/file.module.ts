import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
// import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/file.entity";
// import { ScheduleModule } from "@nestjs/schedule";
// import { ProductEntity } from "src/entities/product.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([FileEntity]),
        // TypeOrmModule.forFeature([ProductEntity]),
        // ScheduleModule.forRoot(),
        AuthModule
    ],
    // providers: [FileService],
    controllers: [FileController],
})
export class FileModule { }