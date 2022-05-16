import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { DeleteObjectRequest, GetObjectRequest, PutObjectRequest, PutObjectOutput, GetObjectOutput, DeleteObjectOutput, ListObjectsRequest, ListObjectsOutput, ListObjectsV2Request } from 'aws-sdk/clients/s3';

@Injectable()
export class AwsS3Service {
  async upload(key: string, buffer: Buffer, bucket: string): Promise<PutObjectOutput>{
    const s3: S3 = new S3();

    const params: PutObjectRequest = {
      Bucket: bucket,
      Body: buffer,
      Key: key
    }

    return await s3.upload(params).promise();
  }

  async list(prefix: string, bucket: string): Promise<ListObjectsOutput> {
    const s3: S3 = new S3();

    const params: ListObjectsV2Request = {
      Bucket: bucket,
      MaxKeys: 10,
      Prefix: `${prefix}/`,
      Delimiter: '/'
    }

    return await s3.listObjectsV2(params).promise();
  }

  async get(key: string, bucket: string): Promise<GetObjectOutput> {
    const s3: S3 = new S3();

    const params: GetObjectRequest = {
      Bucket: bucket,
      Key: key
    }

    return await s3.getObject(params).promise();
  }

  async put(key: string, buffer: Buffer, bucket: string): Promise<PutObjectOutput> {
    const s3: S3 = new S3();

    const params: PutObjectRequest = {
      Bucket: bucket,
      Body: buffer,
      Key: key
    }

    return await s3.putObject(params).promise();
  }

  async delete(key: string, bucket: string): Promise<DeleteObjectOutput> {
    const s3: S3 = new S3();

    const params: DeleteObjectRequest = {
      Bucket: bucket,
      Key: key
    }

    return await s3.deleteObject(params).promise();
  }

}
