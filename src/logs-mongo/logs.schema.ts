import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogsDocument = HydratedDocument<Logs>;

export type LogType = 'info' | 'error' | 'warn';

@Schema({ timestamps: true })
export class Logs {
    @Prop({ required: true })
    type: LogType;

    @Prop({ required: true, type: Object})
    message: any;

}

export const LogsSchema = SchemaFactory.createForClass(Logs);