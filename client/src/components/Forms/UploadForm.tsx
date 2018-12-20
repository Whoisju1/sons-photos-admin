import axios from 'axios';
import React from 'react';
import { Mutation } from 'react-apollo';
import { GET_PRESIGNED_URL, UPLOAD_IMAGE_MUTATION } from '../../graphql/mutations/Photo';
import { GALLERY_QUERY } from '../../graphql/queries/Gallery';
import styled from '../../styled-components';

const Form = styled.form``;

const Input = styled.input.attrs({
  accept: 'image/jpeg',
})``;

const SubmitBtn = styled.input.attrs({
  value: 'Upload Image',
  type: 'submit',
})`

`;

interface IPreSignedData {
  s3PreSignedURL: {
    url: string;
    key: string;
  };
}

interface IPreVariable {
  filename: string;
}

interface IState {
  file: File | null;
}

interface IProps {
  galleryID: string;
  galleryTitle: string;
}

class UploadForm extends React.Component<IProps, IState> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
  }

  public render() {
    return (
      <Mutation mutation={UPLOAD_IMAGE_MUTATION}>
        {
          (uploadPicture, { data, error, loading, client }) => {
            return (
              <Form
                // tslint:disable-next-line:jsx-no-lambda
                onSubmit={async e => {
                  try {
                    e.preventDefault();
                    const { file } = this.state;
                    if (!file) return;

                    const preSignedURL = await client.query<IPreSignedData, IPreVariable>({
                      query: GET_PRESIGNED_URL
                      ,
                      variables: { filename: file.name },
                    });
                    const { url, key } = preSignedURL.data.s3PreSignedURL;
                    // upload photo to S3 bucket
                    await axios.put(url, file, {
                      headers: {
                        'Content-Type': file.type,
                      },
                    });

                    uploadPicture({
                      variables: {
                        photoInfo: {
                          url: key,
                          galleryID: this.props.galleryID,
                          filename: key,
                          photoDescription: !!(this.inputRef.current as HTMLInputElement).value
                          ? (this.inputRef.current as HTMLInputElement).value : null,
                        },
                      },
                      refetchQueries: [
                        {
                          query: GALLERY_QUERY,
                          variables: { galleryID: this.props.galleryID },
                        },
                      ],
                    });

                    (this.inputRef.current as HTMLInputElement).value = '';
                    this.setState({ file: null });
                  } catch (err) {
                    console.dir(err);
                  }
                }}
              >
                <Input
                  type='file'
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e) => {
                    if (!e.currentTarget.files) return;
                    const file: File =  e.currentTarget.files[0];
                    this.setState({ file });
                  }}
                />

                <Input
                  placeholder='Photo Description'
                  type='text'
                  ref={this.inputRef}
                />
                <SubmitBtn disabled={!this.state} />
              </Form>
            );
          }
        }
      </Mutation>
    );
  }
}

export default UploadForm;
