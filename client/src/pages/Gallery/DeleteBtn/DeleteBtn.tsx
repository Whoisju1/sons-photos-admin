import React from 'react';
import styled from '../../../styled-components';
import Button from '../../../shared/Button';
import { Mutation } from 'react-apollo';
import {
  DeletePhotosMutation,
  DeletePhotosMutationVariables,
} from '../../../gql-types.d';
import { DELETE_PHOTO } from '../../../graphql/mutations/photos';

class DeletePhoto extends Mutation<
  DeletePhotosMutation,
  DeletePhotosMutationVariables
> {}

const StyledBtn = styled(Button)`
  border: none;
  padding: 0;
  background-color: transparent;
  outline: none;
`;

const StyledSvg = styled.svg`
  height: 100%;
  width: 100%;
`;

interface Props {
  photoId: string;
}

const DeleteButton: React.FunctionComponent<Props> = props => {
  return (
    <DeletePhoto mutation={DELETE_PHOTO}>
      {deletePhoto => {
        return (
          <StyledBtn
            click={async () => {
              const deletedPhoto = await deletePhoto({
                variables: {
                  photoIDs: [props.photoId],
                },
              });
              console.log(deletedPhoto);
            }}>
            <StyledSvg>
              <path
                stroke="#000"
                strokeWidth="1"
                fill="none"
                d="
                  M10,10
                  L20,20
                "
              />
            </StyledSvg>
          </StyledBtn>
        );
      }}
    </DeletePhoto>
  );
};

export default DeleteButton;
