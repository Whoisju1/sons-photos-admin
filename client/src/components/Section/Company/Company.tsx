import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import styled from '../../../styled-components';

const CompanyContainer = styled.div`

`;

class CompanyQuery extends Query<{}>{};

const GET_COMPANY = gql`
  query getAccount {
  account {
      company {
        companyID
        name
        logo
        motto
        description
        phone
        description
      }
    }
  }
`;

const Company: React.SFC<{}> = () => (
  <CompanyQuery
    query={GET_COMPANY}
  >
    {
      ({ data, loading, error}) => {
        if (loading) return '...loading'
        console.log(data);
        return (
          <CompanyContainer>
            Company Info
          </CompanyContainer>
        )
      }
    }
  </CompanyQuery>
);

export default Company;
