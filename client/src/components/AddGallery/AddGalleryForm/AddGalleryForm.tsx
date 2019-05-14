import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { lighten } from 'polished';
import {
  AddGalleryMutationVariables,
  CreateAccountMutation,
} from '../../../gql-types.d';
import styled from '../../../styled-components';

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
  display: grid;
  grid-gap: 1.3rem;
  grid-template-rows: min-content repeat(auto-fit, auto);
  background-color: #fff;
  padding: 2rem;
  width: 40rem;
  border-radius: 0.2rem;
  border: 0.03rem solid #bdc3c7;
  .input-wrapper {
    display: grid;
  }
  label {
    text-shadow: 0.5rem 0.1rem 1.4rem rgba(0, 0, 0, 0.3);
    margin-bottom: 0.4rem;
  }

  input[type='submit'] {
  }

  input[type='text'] {
  }
`;

const CloseBtn = styled.svg.attrs({
  viewBox: '',
})`
  width: 1.5rem;
  height: 1.5rem;
  justify-self: right;
  &:hover {
    cursor: pointer;
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
            <CloseBtn onClick={props.callback}>
              <line
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                stroke="black"
                strokeWidth=".5"
                fill="black"
              />
              <line
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                stroke="black"
                strokeWidth=".5"
                fill="black"
              />
            </CloseBtn>
            <div className="input-wrapper">
              <label htmlFor="name">Gallery Name *</label>
              <input
                type="text"
                placeholder="Gallery Name"
                name="title"
                id="title"
                value={title}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="name">Gallery Description</label>
              <input
                type="text"
                placeholder="Gallery Description"
                name="description"
                id="name"
                value={description}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <input type="submit" value="Create Gallery" />
          </StyledForm>
        );
      }}
    </AddGalleryMutation>
  );
};

export default AddGalleryForm;
