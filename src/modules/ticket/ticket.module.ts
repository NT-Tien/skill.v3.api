import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { TicketEntity } from "./entities/ticket.entity";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([TicketEntity]),
        AuthModule,
    ],
    providers: [
        {
            provide: 'TICKET_SERVICE_TIENNT',
            useClass: TicketService,
        }
    ],
    controllers: [TicketController]
})
export class TicketModule {}