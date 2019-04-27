// tslint:disable-next-line:interface-name
import { FlattenSimpleInterpolation } from 'styled-components';
import { css } from './styled-components';

export default interface ThemeInterface {
  inputValidation: {
    valid:  FlattenSimpleInterpolation;
    invalid:  FlattenSimpleInterpolation;
  };
  colors: {
    softRed: string;
    primaryColor: string;
  };
  fontSize: {
    extraSmall: string;
    small: string;
    default: string;
    heading1: string;
    heading2: string;
    heading3: string;
  };
  grid: {
    primary: FlattenSimpleInterpolation;
  };
}

const inputValidation = {
  valid: css`
    border: .5px solid #27ae60;
    box-shadow: 0px 0px 10px rgba(39, 174, 96, .3);
    outline-color: #27ae60;
  `,
  invalid: css`
    border: .5px solid red;
    box-shadow: 0px 0px 10px rgba(231, 76, 60, .3);
    outline-color: rgba(231, 76, 60, .3);
  `,
};

const grid = {
  primary: css`
    grid-template-columns: 8rem auto 8rem;
  `,
};

export const theme: ThemeInterface = {
  inputValidation,
  colors: {
    softRed: 'rgb(231, 76, 60)',
    primaryColor: 'red',
  },
  fontSize: {
    extraSmall: '1rem',
    small: '1.2rem',
    default: '1.7rem',
    heading1: '4.5rem',
    heading2: '3.3rem',
    heading3: '2.6rem',
  },
  grid,
};
