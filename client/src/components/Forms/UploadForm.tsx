import axios from 'axios';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { GET_PRESIGNED_URL, UPLOAD_IMAGE_MUTATION } from '../../graphql/mutations/Photo';
import { CACHE_GALLERY, GALLERY_QUERY } from '../../graphql/queries/Gallery';
import { IGalleryData, IPhoto } from '../../graphql/resolvers/index';
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
  }
}

interface IPreVariable {
  filename: string;
}
interface IUploadData {
  savedPhoto: {
    photoID: string;
    url: string;
    filename: string;
  }
}

interface IState {
  file: File | null;
}

interface IProps {
  galleryID: string;
  galleryTitle: string;
}

class UploadForm extends React.Component<IProps, IState> {
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
                      query: GET_PRESIGNED_URL
                      ,
                      variables: { filename: file.name }
                    });

                    const { url, key } = preSignedURL.data.s3PreSignedURL;

                    await axios.put(url, file, {
                      headers: {
                        'Content-Type': file.type,
                      },
                    });

                    await client.mutate<IUploadData>({
                      mutation: UPLOAD_IMAGE_MUTATION,
                      variables: {
                        photoInfo: {
                          url: key,
                          galleryID: this.props.galleryID,
                          filename: key,
                          photoDescription: !!this.inputRef.value.length ? this.inputRef.value : null,
                        },
                      },
                      update: async (proxy, { data: { addPhoto: photo } }: {data: { addPhoto: IPhoto}}) => {
                        const { galleryID, galleryTitle } = this.props;
                        const { gallery: data }: { gallery: IGalleryData } = proxy.readQuery({
                          query: GALLERY_QUERY,
                          variables: { galleryID }
                        }) || { gallery: { galleryID, galleryTitle ,photos: [], __typename: 'Gallery' } };

                        const variables = {
                          gallery: {
                            galleryID,
                            galleryTitle,
                            photos: [photo],
                            __typename: 'Gallery',
                          }
                        };

                        proxy.writeQuery({
                          query: GALLERY_QUERY,
                          variables: { galleryID },
                          data: { gallery: variables.gallery },
                        })
                        // push photo into gallery cache
                        data.photos.push(photo);
                        await client.mutate({
                          mutation: CACHE_GALLERY,
                          variables,
                        });
                      }
                    });

                    this.inputRef.value = '';
                    this.setState({ file: null });
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

export default UploadForm;
