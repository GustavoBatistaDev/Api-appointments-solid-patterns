export interface IUploadUserPhotoService {
  handleUpload(
    bucket: string,
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<string | boolean>;
}
