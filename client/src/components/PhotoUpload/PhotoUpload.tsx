import React, { useState, useRef } from 'react';
import styled from '../../styled-components';
import Photo from '../Photo/Photo';
import { Mutation } from 'react-apollo';
import {
  SavePhotoInfoMutationVariables,
  AddPhotoInput,
  SavePhotoInfoMutation,
} from '../../gql-types.d';

import { SAVE_PHOTO_INFO } from '../../graphql/Photos';
import PhotosContainer from '../PhotosCollection';
import { getFileInfo, PreUploadedFile } from '../../utils/getFileInfo';
import { photoUpload } from '../../utils/photoUpload1';

class UploadPhotoMutation extends Mutation<
  SavePhotoInfoMutation,
  SavePhotoInfoMutationVariables
> {}

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
        const saveImageToS3 = photoUpload(client);
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
                  for await (const { file } of photoLocation) {
                    const key = await saveImageToS3(file);

                    // form data suitable for uploading
                    const photoInfo: AddPhotoInput = {
                      description: '',
                      filename: file.name,
                      url: key,
                    };

                    // execute final mutation to save information of photos in database
                    const newPhotos = await uploadPhotos({
                      variables: {
                        galleryTitle,
                        photoInfo: [photoInfo],
                      },
                    });

                    if (!newPhotos) return;
                    const { data } = newPhotos;
                    if (!data) return;
                    const { addPhotos } = data;
                    console.log('photoUploaded!');
                  }
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
