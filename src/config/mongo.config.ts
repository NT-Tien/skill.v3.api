import { ConnectOptions } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
export const MONGO_HOST = process.env.MONGO_HOST;
export const MONGO_CONFIG = {
    dbName: process.env.MONGO_DB_NAME,
} as ConnectOptions;