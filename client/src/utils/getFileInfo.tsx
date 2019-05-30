export interface PreUploadedFile {
  file: File;
  fileLink: string;
  description?: string;
}
export const getFileInfo = (file: File): Promise<PreUploadedFile> =>
  new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const fileInfo: PreUploadedFile = {
        file,
        fileLink: (e.target as any).result,
      };
      resolve(fileInfo);
    };
    fileReader.readAsDataURL(file);
  });
