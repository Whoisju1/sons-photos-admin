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
  [galleryTitle: string]: string;
  galleryDescription: string;
}

class CreateGalleryForm extends React.Component<{}, IState> {
  public state = {
    galleryTitle: '',
    galleryDescription: '',
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
                  value={this.state.galleryTitle}
                  onChange={this.handleChange}
                  name="galleryTitle"
                />
                <Input
                  placeholder="Gallery Description"
                  value={this.state.galleryDescription}
                  onChange={this.handleChange}
                  name="galleryDescription"
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
