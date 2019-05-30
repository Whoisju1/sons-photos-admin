import React, { useState, useRef, useEffect } from 'react';
import styled from '../../styled-components';
import Photo from '../Photo/Photo';
import { Mutation } from 'react-apollo';
import {
  SavePhotoInfoMutationVariables,
  QueryS3PreSignedUrLsArgs,
  S3PreSignedUrl,
  AddPhotoInput,
  SavePhotoInfoMutation,
} from '../../gql-types.d';

import { SAVE_PHOTO_INFO, GET_SIGNED_URL } from '../../graphql/Photos';
import { uploadImgToS3 } from '../../utils/s3UploadImg';
import PhotosContainer from '../PhotosCollection';

class UploadPhotoMutation extends Mutation<
  SavePhotoInfoMutation,
  SavePhotoInfoMutationVariables
> {}

interface PreUploadedFile {
  file: File;
  fileLink: string;
  description?: string;
}

// TODO: Be sure to use the new `for await` for this function
// function not yet in use
const getFileInfo = (file: File): Promise<PreUploadedFile> =>
  new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.onload = e => {
      const fileInfo: PreUploadedFile = {
        file, // the file itself
        fileLink: (e.target as any).result, // this is the url for the preview file to render in the img tag
      };
      resolve(fileInfo);
    };
    fileReader.readAsDataURL(file);
  });

const StyledPhotoUpload = styled.div`
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  grid-template-rows: 1fr min-content;
  min-height: 100%;
`;

const StyledForm = styled.form`
  border: 0.04rem solid gray;
  padding: 1rem;
  background-color: #fff;
  grid-column: 1/-1;
  grid-row: -2/-1;
  display: grid;
  grid-template-columns:
    [col-start]repeat(auto-fit, minmax(min-content, 11rem))
    [col-end];
  grid-auto-rows: 3rem;
  grid-column-gap: 1rem;
  position: sticky;
  bottom: 0;
  label {
    background-color: aliceblue;
    border: 0.004rem solid gray;
    display: grid;
    justify-content: center;
    align-items: center;
    & > input {
      display: none;
    }
  }
  input[type='submit'] {
    /* TODO: style input button */
  }
`;

const PhotoInput = styled.input.attrs({
  accept: 'image/png, image/jpeg',
  type: 'file',
  multiple: true,
  id: 'image_upload',
  name: 'image_upload',
})``;

interface Props {
  galleryTitle: string;
}

const getFilenames = (fileInfo: PreUploadedFile[]): string[] =>
  fileInfo.map(({ file }) => file.name);

const PhotoUpload: React.FunctionComponent<Props> = ({ galleryTitle }) => {
  const [photoLocation, setPhotoLocation] = useState<PreUploadedFile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = async () => {
    if (fileRef.current) {
      const pickedFiles = fileRef.current.files || [];

      const filesForUpload = [...photoLocation];

      for await (const file of pickedFiles) {
        const fileInfo = await getFileInfo(file);
        filesForUpload.push(fileInfo);
      }
      setPhotoLocation(filesForUpload);
    }
  };

  return (
    <UploadPhotoMutation mutation={SAVE_PHOTO_INFO}>
      {(uploadPhotos, { client }) => {
        return (
          <StyledPhotoUpload className="container">
            <PhotosContainer<PreUploadedFile> photos={photoLocation}>
              {photos => {
                return photos.map((photo, i) => (
                  <Photo key={i} src={photo.fileLink} />
                ));
              }}
            </PhotosContainer>
            <StyledForm
              className="form"
              onSubmit={async e => {
                try {
                  e.preventDefault();
                  // get preSigned URL from AWS
                  const {
                    data: { s3PreSignedURLs },
                  } = await client.query<
                    { s3PreSignedURLs: S3PreSignedUrl[] },
                    QueryS3PreSignedUrLsArgs
                  >({
                    query: GET_SIGNED_URL,
                    variables: { filenames: getFilenames(photoLocation) },
                  });

                  // upload photos to AWS S3 bucket
                  const urls = s3PreSignedURLs.map(({ url }, i) => {
                    const { file } = photoLocation[i];
                    // return a promise
                    return uploadImgToS3(url as string, file);
                  });
                  // resolve promises
                  await Promise.all(urls);

                  // form data suitable for uploading
                  const photoInfo: AddPhotoInput[] = photoLocation.reduce(
                    (prev, curr, index) => {
                      const arr: AddPhotoInput = {
                        description: '',
                        filename: curr.file.name,
                        url: s3PreSignedURLs[index].key as string,
                      };
                      return [...prev, arr];
                    },
                    [] as any,
                  );

                  // execute final mutation to save information of photos in database
                  const newPhotos = await uploadPhotos({
                    variables: {
                      galleryTitle,
                      photoInfo,
                    },
                  });

                  if (!newPhotos) return;
                  const { data } = newPhotos;
                  if (!data) return;
                  const { addPhotos } = data;
                  // TODO: Do something with downloaded photos
                } catch (err) {
                  console.dir(err);
                  console.log(err.message);
                }
              }}>
              <label htmlFor="image_upload">
                Add Photo
                <PhotoInput ref={fileRef as any} onChange={handleChange} />
              </label>
              {!!photoLocation.length && (
                <input type="submit" value="Upload Photo(s)" />
              )}
            </StyledForm>
          </StyledPhotoUpload>
        );
      }}
    </UploadPhotoMutation>
  );
};

export default PhotoUpload;
