import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { Injectable } from "@nestjs/common";
import { File } from 'multer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService ) {}
  private storage = new Storage({
    keyFilename: path.join(__dirname, `../../${this.configService.get<string>('GCP_CREDENTIALS')}.json`), // Your service account key
  });
  private bucketName = this.configService.get<string>('BUCKET_NAME');
  private filePath = 'images/';
  async uploadFile(file: File): Promise<any> {
    try {
      if (!file) throw new Error("No file provided");
      const bucket = this.storage.bucket(this.bucketName);
      const blob = bucket.file(`${this.filePath}${Date.now()}.${file.mimetype.split("/")[1]}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });
  
      let url = await new Promise((resolve, reject) => {
        blobStream.on('finish', async () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
          resolve(publicUrl);
        });
  
        blobStream.on('error', (err) => reject(err));
        blobStream.end(file.buffer);
      });

      return {Location: url, name: file.originalname}
    
    } catch (error) {
      throw new Error(error.message || "File upload failed");
    }
  }
}
