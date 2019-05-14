import React, { useState } from 'react';
import styled from '../../styled-components';
import AddGalleryForm from './AddGalleryForm';
import Button from '../../shared/Button';

const StyledAddGallery = styled.div`
  .button {
    border: none;
    background-color: none;
  }
`;

interface Props {}

const AddGallery: React.FunctionComponent<Props> = props => {
  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm(!showForm);
  return (
    <StyledAddGallery>
      {!showForm && <Button click={toggleShowForm}>Add Gallery</Button>}
      {showForm && <AddGalleryForm callback={toggleShowForm} />}
    </StyledAddGallery>
  );
};

export default AddGallery;
