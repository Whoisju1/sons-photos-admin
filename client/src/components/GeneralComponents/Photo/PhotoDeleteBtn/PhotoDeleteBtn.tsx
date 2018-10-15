import * as React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_PHOTO } from 'src/graphql/mutations/Photo';
import Button from '../../Button/Button';

interface IProps {
  filename: string;
}
interface IDeletedPhoto {
	deletePhoto: Array<{ photoID: string; __typename: string;}>
}

const PhotoDeleteBtn: React.SFC<IProps> = ({ filename }) => (
  <Mutation mutation={DELETE_PHOTO}>
						{(deletePhoto, { data, loading }: { data?: IDeletedPhoto, loading?: boolean }) => {
							if (loading) return '...loading';
							if (data) return null;
							return (
								<Button
									btnType="danger"
									// tslint:disable-next-line:jsx-no-lambda
									click={() => {
										deletePhoto({ variables : { filenames : [ filename ]}})
									}}
								>
									Delete Photo
								</Button>
							);
						}}
					</Mutation>
);

export default PhotoDeleteBtn;

PhotoDeleteBtn.displayName = 'PhotoDeleteButton';