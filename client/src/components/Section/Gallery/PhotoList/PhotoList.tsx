import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { DELETE_PHOTO } from '../../../../graphql/mutations/Photo';
import styled from '../../../../styled-components';
import Button from '../../../GeneralComponents/Button/Button';
import Photo from '../../../GeneralComponents/Photo/Photo';

const PhotoContainer = styled.div`
	border: .05rem solid gray;
	box-shadow: .05rem .07rem .14rem rgba(0, 0, 0, .3);
`;

interface IPhoto {
	url: string,
	photoID: string,
	filename: string,
}
export interface IProps {
	photos: IPhoto[],
}

const PhotoList: React.SFC<IProps> = ({ photos }) => (
	<React.Fragment>
		{photos.map(({ photoID, url, filename }) => (
			<PhotoContainer key={photoID}>
				<Photo imageType="thumbnail" src={url} />
				<ApolloConsumer key={url}>
					{client => (
						<Button
							// tslint:disable-next-line:jsx-no-lambda
							click={() =>
								client.mutate({
									mutation  : DELETE_PHOTO,
									variables : {
										filenames : [ filename ],
									},
								})}
							btnType="danger"
						>
							Delete Photo
						</Button>
					)}
				</ApolloConsumer>
			</PhotoContainer>
		))}
	</React.Fragment>
);

export default PhotoList;
