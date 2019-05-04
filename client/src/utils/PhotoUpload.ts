import { UploadImgToS3, uploadImgToS3 } from './s3UploadImg';
import { ApolloClient } from "apollo-boost";
import { S3PreSignedUrl } from "../gql-types.d";

export const photoUpload =
  (uploadImgToS3: UploadImgToS3) =>
    (client: ApolloClient<Object>) =>
      (arr: S3PreSignedUrl[]) => {

      }