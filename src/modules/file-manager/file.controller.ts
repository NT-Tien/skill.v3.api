import { Controller, Delete, Get, HttpException, Param, Post, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor, MemoryStorageFile, UploadedFile } from "@blazity/nest-file-fastify";
import { FastifyReply } from "fastify";
import { AdminGuard } from "../auth/guards/admin.guard";
import * as dotenv from 'dotenv';

dotenv.config();


const url = process.env.FILE_PATH_STORAGE;
const api_key = process.env.FILE_API_KEY;

@ApiTags('file')
@Controller('file')
export class FileController {

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            },
        },
    })
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: MemoryStorageFile) {
        try {
            var fileBlob = new Blob([file.buffer], { type: file.mimetype });
            var dataForm = new FormData();
            dataForm.append("file", fileBlob);
            var response = await fetch(url + 'file/upload', {
                method: 'POST',
                headers: {
                    'Api-Key': api_key
                },
                body: dataForm
            })
            var data = await response.json();
            return data.data;
        } catch (error) {
            throw new HttpException('Network response was not ok', 404);
        }
    }

    // get image to show
    @Get('image/:path')
    async showFile(@Param('path') path: string, @Res() res: FastifyReply) {
        try {
            var response = await fetch(url + 'image/' + path, {
                method: 'GET',
                headers: {
                    'Api-Key': api_key
                }
            })
            var buffer = await response.arrayBuffer();
            const image = Buffer.from(buffer);
            res.header('Content-Type', 'image/png');
            res.send(image);
        } catch (error) {
            throw new HttpException('Network response was not ok', 404);
        }
    }

} 