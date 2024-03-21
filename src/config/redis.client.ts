import * as dotenv from 'dotenv';
import { Redis } from 'ioredis';
dotenv.config();

export const redisClientLocal = new Redis({
    port: parseInt(process.env.REDIS_PORT_BASIC),
    host: process.env.REDIS_HOST_BASIC,
    password: process.env.REDIS_PASSWORD_BASIC,
});