import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { DeleteObjectRequest, GetObjectRequest, PutObjectRequest, PutObjectOutput, GetObjectOutput, DeleteObjectOutput, ListObjectsRequest } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class FileStorageService {
  constructor(private readonly configService: ConfigService, private readonly awsS3Service: AwsS3Service) {}

  async create(user_id: string, file: Express.Multer.File, bucket: string): Promise<string[]> {
    const { buffer, originalname } = file;

    const fileKey: string = `${user_id}/${uuid()}:${originalname}`;

    const bucketEnv: string = this.configService.get(bucket);
    
    const fileObject: any = await this.awsS3Service.upload(fileKey, buffer, bucketEnv);

    return [fileKey, fileObject['Location']];
  }

  findAll() {
    return `This action returns all awsS3`;
  }

  findOne(id: number) {
    return `This action returns a #${id} awsS3`;
  }

  update(id: number, updateAwsS3Dto: any) {
    return `This action updates a #${id} awsS3`;
  }

  remove(id: number) {
    return `This action removes a #${id} awsS3`;
  }
}
