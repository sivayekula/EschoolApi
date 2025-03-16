import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { File } from 'multer';

@Injectable()
export class UploadService {
  private storage = new Storage({
    keyFilename: path.join(__dirname, '../../school-management-450616-8b0ba4cfd14c.json'), // Your service account key
  });
  private bucketName = 'eschool-images';
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
