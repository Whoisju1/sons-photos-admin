import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../../blocks/Form/index';

const GET_PRESIGNED_URL = gql`
  query getPresignedURL ($filename: String!) {
    s3PreSignedURL (filename: $filename) {
      url
      key
    }
  }
`;

class UploadForm extends Component {
  state = {
    filename: '',
    file: {},
  }

  handleChange = ({ target }) => {
    const { files } = target;
    this.setState((state, props) => ({
      file: files[0],
      filename: files[0].name,
    }));
  }

  render() {
    return (
      <ApolloConsumer>
        {
          client => (
            <Form
              onSubmit={
                async (event) => {
                  const { filename } = this.state;
                  event.preventDefault();
                  const preSignedURL = await client.query({
                    query: GET_PRESIGNED_URL,
                    variables: {
                      filename,
                    },
                  });
                  console.log(preSignedURL);
                }
              }
            >
              <Form.FileInput onChange={this.handleChange} />
              <Form.SubmitBtn value="Upload" />
            </Form>
          )
        }
      </ApolloConsumer>
    );
  }
}

export default UploadForm;
