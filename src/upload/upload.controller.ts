import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { memoryStorage } from 'multer';
const storage = memoryStorage()


const fileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    callback(new BadRequestException('Only image files are allowed!'), false);
  } else {
    callback(null, true);
  }
};
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file', {storage, fileFilter}))
  async uploadImage(@UploadedFile() file: any) {
    const result = await this.uploadService.uploadFile(file);
    return result // Return the URL from the cloud
  }
}


