import { IUploadUserPhotoService } from "../../interfaces/upload/upload.interfaces";
import { config } from "dotenv";
import aws from "aws-sdk";

config();

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT as string);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID as string,
    secretAccessKey: process.env.APLICATION_KEY as string,
  },
});

export class UploadUserPhotoService implements IUploadUserPhotoService {
  public async handleUpload(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<string | boolean> {
    try {
      const fileUploaded = await s3
        .upload({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
        })
        .promise();

      const imagePath = fileUploaded.Location;
      console.log(imagePath);

      return imagePath;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
