import gql from 'graphql-tag';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from '../../styled-components';

const CREATE_GALLERY_MUTATION = gql`
  mutation createGllery($galleryInfo: createGalleryInput) {
    createGallery (input: $galleryInfo) {
      galleryID
      title
      description
      clickCount
      createdAt
    }
  }
`;

const Form = styled.form`

`;

const Input = styled.input``;

const SubmitBtn = styled.input.attrs({
  value: 'Create Gallery',
  type: 'submit',
})`

`;

interface IState {
  // tslint:disable-next-line:variable-name
  [gallery_title: string]: string;
  gallery_description: string;
}

class CreateGalleryForm extends React.Component<{}, IState> {
  public state = {
    gallery_title: '',
    gallery_description: '',
  };

  public render() {
    return (
      <ApolloConsumer>
        {
          client => {
            return (
              <Form
                // tslint:disable-next-line:jsx-no-lambda
                onSubmit={async (e) => {
                  try {
                    e.preventDefault();
                    const newGallery = await client.mutate({
                      mutation: CREATE_GALLERY_MUTATION,
                      variables: { galleryInfo: this.state }
                    });

                  console.log(newGallery);
                  } catch (err) {
                    console.dir(err);
                    console.log(err);
                  }
                }}
              >
                <Input
                  placeholder="Gallery Name"
                  value={this.state.gallery_title}
                  onChange={this.handleChange}
                  name="gallery_title"
                />
                <Input
                  placeholder="Gallery Description"
                  value={this.state.gallery_description}
                  onChange={this.handleChange}
                  name="gallery_description"
                />
                <SubmitBtn />
              </Form>
            )
          }
        }
      </ApolloConsumer>
    );
  }

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = e.currentTarget;
    this.setState({ [name]: value });
  }
}

export default CreateGalleryForm;
