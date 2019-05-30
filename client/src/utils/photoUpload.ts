import { uploadImgToS3 } from './s3UploadImg';
import { ApolloClient } from "apollo-boost";
import { S3PreSignedUrl, QueryS3PreSignedUrLsArgs } from "../gql-types.d";
import { GET_SIGNED_URL } from '../graphql/Photos';

export const photoUpload =
  (client: ApolloClient<Object>) =>
    // return function that takes an array of files
    async (file: File): Promise<string> => {
      try {
        const { data } = await client.query<
          { s3PreSignedURLs: S3PreSignedUrl[] },
          QueryS3PreSignedUrLsArgs
        >({
          query: GET_SIGNED_URL,
          variables: { filenames: [file.name] },
        });
        // since I'm only submitting one file the first item in the array received will be the preSignedUrl
        const [preSignedUrl] = data.s3PreSignedURLs;
        const { key, url } = preSignedUrl;

        // upload photos to S3
        await uploadImgToS3(url as string, file);

        return key as string;
      } catch (e) {
        return e;
      }
    }