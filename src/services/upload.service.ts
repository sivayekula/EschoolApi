import * as AWS from "aws-sdk";
import { Injectable } from "@nestjs/common";
import { File } from 'multer';

@Injectable()
export class UploadService {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY || "c2Qpn_OA2ScWC6LAM10ml2ZzEIR_aDfQvSj9rOo_",
      secretAccessKey: process.env.SECRET_KEY || "6mx6LJ-SAvF-jZo5UKBnZ3FU3TIv6kVOEzzVU6_L",
      region: process.env.REGION || "ap-southeast-2",
      endpoint: process.env.ENDPOINT || "https://mos.ap-southeast-2.sufybkt.com",
    });
  }
  async uploadFile(file: File): Promise<any> {
    try {
      if (!file) throw new Error("No file provided");
      const params = {
        Bucket: process.env.BUCKET_NAME || "stu-images",
        Key: `${Date.now()}.${file.mimetype.split("/")[1]}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      return await this.s3.upload(params).promise();
    } catch (error) {
      throw new Error(error.message || "File upload failed");
    }
  }
}
