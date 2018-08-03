import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import Form from '../../blocks/Form/index';

const GET_PRESIGNED_URL = gql`
  query getPresignedURL ($filename: String!) {
    s3PreSignedURL (filename: $filename) {
      url
      key
    }
  }
`;

const ADD_PHOTO = gql`
  mutation StorePhoto ($photoInfo:photoInput) {
    addPhoto (input:$photoInfo) {
      photoID
      url
      description
      clickCount
      createdAt
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
    this.setState(() => ({
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
                  try {
                    event.preventDefault();
                    const { filename, file } = this.state;
                    // get pre-signed url from aws
                    const preSignedURL = await client.query({
                      query: GET_PRESIGNED_URL,
                      variables: {
                        filename,
                      },
                    });
                    const { url, key } = preSignedURL.data.s3PreSignedURL;
                    await axios.put(url, file, {
                      headers: {
                        'Content-Type': file.type,
                      },
                    });

                    const photoInfo = await client.mutate({
                      mutation: ADD_PHOTO,
                      variables: {
                        photoInfo: {
                          url: key,
                          gallery_id: 11,
                          photo_description: 'Some description',
                        },
                      },
                    });

                    console.log(photoInfo);
                    return photoInfo;
                  } catch (err) {
                    return err;
                  }
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
