import React, { useState, useRef } from 'react';
import styled from '../../styled-components';
import Photo from '../Photo/Photo';
import { Mutation } from 'react-apollo';
import {
  Photo as PhotoData,
  SavePhotoInfoMutationVariables,
  QueryS3PreSignedUrLsArgs,
  S3PreSignedUrl,
  AddPhotoInput,
  MutationAddPhotosArgs,
  SavePhotoInfoMutation,
} from '../../gql-types.d';

import { SAVE_PHOTO_INFO, GET_SIGNED_URL } from '../../graphql/Photos';
import { uploadImgToS3 } from '../../utils/s3UploadImg';

class UploadPhotoMutation extends Mutation<
  SavePhotoInfoMutation,
  SavePhotoInfoMutationVariables
> {}

const StyledPhotoUpload = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-column: 1/-1;
  background-color: aliceblue;
  border: 0.1rem solid black;
  height: 100%;
  .photos {
    display: grid;
    grid-template-columns: 3rem;
  }
`;

const StyledForm = styled.form``;

const InputContainer = styled.div`
  position: relative;
  border: 0.004rem solid gray;
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  border: 0.004rem solid gray;
  box-shadow: 0.2rem 0.4rem 1.4rem rgba(0, 0, 0, 0.3);
`;

const PhotoInput = styled.input.attrs({
  accept: 'image/png, image/jpeg',
  type: 'file',
  multiple: true,
  id: 'image_upload',
  name: 'image_upload',
})`
  width: 100%;
  height: 100%;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

interface PreUploadedFile {
  file: File;
  fileLink: string;
}

interface Props {
  galleryTitle: string;
}

const getFilenames = (fileInfo: PreUploadedFile[]): string[] =>
  fileInfo.map(({ file }) => file.name);

const PhotoUpload: React.FunctionComponent<Props> = ({ galleryTitle }) => {
  const [photoLocation, setPhotoLocation] = useState<PreUploadedFile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  let fileInfoList: PreUploadedFile[] = [];

  const handleChange = () => {
    if (fileRef.current) {
      const pickedFiles = Array.from(fileRef.current.files || []);
      pickedFiles.map(file => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          const fileInfo = { file, fileLink: (e.target as any).result };
          fileInfoList = [...fileInfoList, fileInfo];
          // I had to do it this way to avoid multiple renders
          if (fileInfoList.length === pickedFiles.length) {
            const combinedArray = [...photoLocation, ...fileInfoList];
            setPhotoLocation(combinedArray);
            fileInfoList = [];
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  return (
    <UploadPhotoMutation mutation={SAVE_PHOTO_INFO}>
      {(uploadPhotos, { client }) => {
        return (
          <StyledPhotoUpload>
            <div className="photos">
              {photoLocation.map(({ fileLink }, i) => (
                <Photo key={i} src={fileLink} />
              ))}
            </div>
            <StyledForm
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
                    variables: {
                      filenames: getFilenames(photoLocation),
                    },
                  });

                  // upload photos to AWS S3 bucket
                  const urls = s3PreSignedURLs.map(({ key, url }, i) => {
                    const { file } = photoLocation[i];
                    return uploadImgToS3(url as string, file);
                  });
                  await Promise.all(urls);

                  const photoInfo: AddPhotoInput[] = photoLocation.reduce(
                    (prev, curr, index) => {
                      const arr: AddPhotoInput = {
                        // description: '',
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
                  console.log('Oops! Something went wrong!');
                  console.dir(err);
                }
              }}>
              <InputContainer>
                <StyledLabel htmlFor="image_upload">Add Photo</StyledLabel>
                <PhotoInput ref={fileRef as any} onChange={handleChange} />
                <input type="submit" value="Upload Photos" />
              </InputContainer>
              <input type="submit" value="Upload Photo" />
            </StyledForm>
          </StyledPhotoUpload>
        );
      }}
    </UploadPhotoMutation>
  );
};

export default PhotoUpload;
