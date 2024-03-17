// import { HttpException, Injectable } from "@nestjs/common";
// import { Cron, CronExpression, Interval } from "@nestjs/schedule";
// import { InjectRepository } from "@nestjs/typeorm";
// import { FileEntity } from "src/entities/file.entity";
// import { ProductEntity } from "src/entities/product.entity";
// import { Repository } from "typeorm";

// const url = 'http://localhost:8081/';
// const api_key = 'h9adh7wkaud3bgrbs9hu3r';

// @Injectable()
// export class FileService {
//   constructor(
//     @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>,
//     @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>
//   ) { }


//   async deleteFile(path: string) {
//     try {
//       var response = await fetch(url + 'file/remove/' + path, {
//         method: 'DELETE',
//         headers: {
//           'Api-Key': api_key
//         }
//       })
//       var data = await response.json();
//       return data.data;
//     } catch (error) {
//       throw new HttpException('Network response was not ok', 404);
//     }
//   }

//   @Cron(CronExpression.EVERY_DAY_AT_2PM)
//   // @Interval(1000 * 60)
//   async autoClearFileWasted() {
//     // get images from product
//     var listUsing = [];
//     var useingImages = await this.productRepository.find({ select: ['images'] });
//     useingImages.forEach((img) => {
//       listUsing.push(...img.images);
//     });
//     // check if the image is not used by any product then delete it
//     var allImages = await this.fileRepository.find();
//     allImages.forEach((img) => {
//       if (!listUsing.includes(img.path)) {
//         this.deleteFile(img.path);
//       }
//     });
//     console.log('Executing daily task at 2 PM');
//   }

// }