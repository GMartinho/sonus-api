import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {
  async upload(key: string, buffer: Buffer) {
    const s3 = new S3();
    return await s3.upload({
      Bucket: process.env.BUCKET_NAME!,
      Body: buffer,
      Key: key,
    }).promise();
  }

  async retrieve(key: string) {
    const s3 = new S3();
    return await s3.getObject({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
    }).promise();
  }

  async modify(key: string, buffer: Buffer) {
    const s3 = new S3();
    return await s3.putObject({
      Bucket: process.env.BUCKET_NAME!,
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
