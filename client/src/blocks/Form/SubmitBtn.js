import React from 'react';
import styled from 'styled-components';

const Button = styled.input.attrs({
  type: 'submit',
})`
`;

export default props => <Button {...props} />;
