import axios from 'axios';
import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from '../../styled-components';

const Form = styled.form``;

const Input = styled.input``;

const SubmitBtn = styled.input.attrs({
  value: 'Upload Image',
  type: 'submit',
})`

`;

const GET_PRESIGNED_URL = gql`
  query getPresignedURL($filename: String!) {
    s3PreSignedURL(filename: $filename) {
      url
      key
    }
  }
`;

interface IPreSignedData {
  s3PreSignedURL: {
    url: string;
    key: string;
  }
}

interface IPreVariable {
  filename: string;
}

const UPLOAD_IMAGE_MUTATION = gql`
  mutation savedPhoto ($photoInfo:photoInput) {
    addPhoto (input:$photoInfo) {
      photoID
      url
      description
      createdAt
    }
  }
`;

interface IUploadData {
  savedPhoto: {
    photoID: string;
    url: string;
    description: string;
    createdAt: string;
  }
}

interface IState {
  file: File | null;
}

class ImageUploadForm extends React.Component<{}, IState> {
  private inputRef: HTMLInputElement;

  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return (
      <ApolloConsumer>
        {
          client => {
            return (
              <Form
                // tslint:disable-next-line:jsx-no-lambda
                onSubmit={async e => {
                  try {
                    e.preventDefault();
                    const { file } = this.state;
                    if (!file) return;
                    const preSignedURL = await client.query<IPreSignedData, IPreVariable>({
                      query: GET_PRESIGNED_URL,
                      variables: { filename: file.name }
                    });

                    const { url, key } = preSignedURL.data.s3PreSignedURL;

                    await axios.put(url, file, {
                      headers: {
                        'Content-Type': file.type,
                      },
                    });

                    const photoInfo = await client.mutate<IUploadData>({
                      mutation: UPLOAD_IMAGE_MUTATION,
                      variables: {
                        photoInfo: {
                          url: key,
                          gallery_id: 3,
                          photo_description: !!this.inputRef.value.length ? this.inputRef.value : null,
                        },
                      },
                    });

                    this.inputRef.value = '';
                    this.setState({ file: null });
                    
                    console.log({ photoInfo });
                  } catch (err) {
                    console.dir(err);
                  }
                }}
              >
                <Input
                  type="file"
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e) => {
                    if (!e.currentTarget.files) return;
                    const file: File =  e.currentTarget.files[0];
                    this.setState({ file })
                  }}
                />

                <Input
                  placeholder="Photo Description"
                  // tslint:disable-next-line:jsx-no-lambda
                  type="text"
                  // tslint:disable-next-line:jsx-no-lambda
                  innerRef={(x: HTMLInputElement) => this.inputRef = x}
                />
                <SubmitBtn disabled={!this.state} />
              </Form>
            );
          }
        }
      </ApolloConsumer>
    )
  }
}

export default ImageUploadForm;
