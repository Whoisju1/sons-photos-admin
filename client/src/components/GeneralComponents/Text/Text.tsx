import * as React from 'react';
import styled from '../../../styled-components';

const Text = styled.p<{}>``;

interface IProps {
  children: React.ReactChild;
}

export default (props: IProps) => (
  <Text>{props.children}</Text>
);
