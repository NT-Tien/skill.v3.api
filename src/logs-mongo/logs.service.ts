import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Logs } from "./logs.schema";
import { Model } from "mongoose";

@Injectable()
export class LogsService {
    constructor(
        @InjectModel(Logs.name) private logsModel: Model<Logs>,
    ) { }

    async createLog(type: string, message: string): Promise<Logs> {
        const log = new this.logsModel({ type, message });
        return log.save();
    }

    async getLogs(page?: number, limit?: number): Promise<Logs[]> {
        if (page && limit) {
            return this.logsModel.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec();
        } else {
            return this.logsModel.find().exec();
        }
    }
}