import axios from 'axios';

export type UploadImgToS3 = (url: string, file: File) => Promise<void>;

export const uploadImgToS3: UploadImgToS3 = async (url, file) => {
  await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
