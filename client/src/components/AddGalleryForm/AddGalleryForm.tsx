import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import {
  AddGalleryMutationVariables,
  CreateAccountMutation,
} from '../../gql-types.d';
import styled from '../../styled-components';

const ADD_GALLERY_QUERY = gql`
  mutation AddGallery($galleryDetails: CreateGalleryInput!) {
    createGallery(input: $galleryDetails) {
      id
      title
      description
    }
  }
`;

const StyledForm = styled.form`
  label {
  }

  input[type='submit'] {
  }

  input[type='text'] {
  }
`;

interface IProps {
  callback?: () => void;
}

class AddGalleryMutation extends Mutation<
  CreateAccountMutation,
  AddGalleryMutationVariables
> {}

const AddGalleryForm: React.FunctionComponent<IProps> = props => {
  const [galleryDetails, setGalleryDetails] = useState({
    description: '',
    thumbnail: '',
    title: '',
  });

  /**
   * TODO: Create means to upload photo and a way to preview photo before
   */
  const { description, thumbnail, title } = galleryDetails;
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setGalleryDetails({
      ...galleryDetails,
      [name]: value,
    });
  };

  return (
    <AddGalleryMutation mutation={ADD_GALLERY_QUERY}>
      {createGallery => {
        return (
          <StyledForm
            onSubmit={async e => {
              e.preventDefault();
              const newGallery = await createGallery({
                variables: {
                  galleryDetails,
                },
              });
              if (props.callback) return props.callback();
              console.log(newGallery);
            }}>
            <label htmlFor="name">Gallery Name</label>
            <input
              type="text"
              placeholder="Gallery Name"
              name="title"
              id="title"
              value={title}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Gallery Description</label>
            <input
              type="text"
              placeholder="Gallery Description"
              name="description"
              id="name"
              value={description}
              onChange={handleChange}
            />
            <input type="submit" value="Create Gallery" />
          </StyledForm>
        );
      }}
    </AddGalleryMutation>
  );
};

export default AddGalleryForm;
