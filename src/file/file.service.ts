import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async upload(key: string, file: Express.Multer.File, bucket_name: string) {
    const s3 = new S3();
    return await s3.upload({
      Bucket: this.configService.get(bucket_name),
      Body: file.buffer,
      Key: key,
    }).promise();
  }

  async retrieve(key: string) {
    const s3 = new S3();
    return await s3.getObject({
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: key,
    }).promise();
  }

  async modify(key: string, buffer: Buffer) {
    const s3 = new S3();
    return await s3.putObject({
      Bucket: this.configService.get('BUCKET_NAME'),
      Body: buffer,
      Key: key,
    }).promise();
  }

  // async delete(key: String) {
  //   const s3 = new S3();
  //   return await s3.deleteObject({
  //     Bucket: process.env.BUCKET_NAME!,
  //     Key: key,
  //   }).promise();
  // }
}
