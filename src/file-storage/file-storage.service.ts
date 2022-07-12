import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { DeleteObjectRequest, GetObjectRequest, PutObjectRequest, PutObjectOutput, GetObjectOutput, DeleteObjectOutput, ListObjectsRequest, ListObjectsV2Output } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class FileStorageService {
  private readonly bucketProvider: string = 'BUCKET_PROVIDER';

  constructor(private readonly configService: ConfigService, private readonly awsS3Service: AwsS3Service) {}

  async create(user_id: string, file: Express.Multer.File, bucket: string, parent_id?: number): Promise<string[]> {
    const { buffer, originalname } = file;

    const fileKey: string =  parent_id ? `${user_id}/${parent_id}/${uuid()}:${originalname}` : `${user_id}/${uuid()}:${originalname}`;

    const bucketEnv: string = this.configService.get(bucket);
    
    return await this.awsS3Service.upload(fileKey, buffer, bucketEnv).then((response) => {
      const fileLocation = response['Location'];
      return [fileKey, fileLocation];
    }).catch((error) => {
      throw new HttpException('The service responsible to persist your file is currently unavailable', HttpStatus.SERVICE_UNAVAILABLE);
    });
    
  }

  async findAll(user_id: string, bucket: string, parent_id?: number) {
    const folderPrefix: string = parent_id ? `${user_id}/${parent_id}` : `${user_id}`;

    const bucketEnv: string = this.configService.get(bucket);

    const bucketProviderEnv: string = this.configService.get(this.bucketProvider);

    const fileObjects: ListObjectsV2Output = await this.awsS3Service.list(folderPrefix, bucketEnv);

    let folderImages = {};

    for(let i = 0; i < fileObjects.Contents.length; i++) {
      folderImages[fileObjects.Contents[i].Key] = `https://${bucketEnv}.${bucketProviderEnv}/${fileObjects.Contents[i].Key}`;
    }

    return folderImages;
  }

  async findOne(key: string, bucket: string) {
    const bucketEnv: string = this.configService.get(bucket);

    const bucketProviderEnv: string = this.configService.get(this.bucketProvider);

    const fileObject: GetObjectOutput = await this.awsS3Service.get(key, bucketEnv);

    const fileUrl: string = fileObject ? `https://${bucketEnv}.${bucketProviderEnv}/${key}` : null;

    return fileUrl;
  }

  async update(user_id: string, file: Express.Multer.File, bucket: string, parent_id?: number) {
    const { buffer, originalname } = file;

    const fileKey: string =  parent_id ? `${user_id}/${parent_id}/${uuid()}:${originalname}` : `${user_id}/${uuid()}:${originalname}`;

    const bucketEnv: string = this.configService.get(bucket);

    return await this.awsS3Service.put(fileKey, buffer, bucketEnv).then((response) => {
        const fileLocation = response['Location'];
        return [fileKey, fileLocation];
      }).catch((error) => {
        throw new HttpException('The service responsible to persist your file is currently unavailable', HttpStatus.SERVICE_UNAVAILABLE);
      });
  }

  async remove(id: number) {
    return `This action removes a #${id} awsS3`;
  }
}
