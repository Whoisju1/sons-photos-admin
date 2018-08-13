import { gql } from 'apollo-server-express';

export default gql`
    # ROOT TYPES
  type Query {
    # Information for the current user is provided - Authentication Required
    account: Account
    # All the galleries are provided
    galleries(sortOrder: SortOrder, sortBy: SortGalleryBy): [Gallery]
    # the gallery for the given 'galleryID' is provided
    gallery (galleryID: Int): Gallery
    # The photo for the given 'photoID' is provided
    photo: Photo
    # user is logged in and user information is provided
    login (input: loginInput): Account
    # This query provides a pre-signed URL from AWS S3 which is as the address where the file is uploaded
    s3PreSignedURL (filename: String!): S3PreSignedURL
  }

  type Mutation {
    # User is signed up and user information is provided
    createAccount(input: createAccountInput): Account
    # A Photo is added to the gallery of choice
    addPhoto (input: photoInput): Photo
    # A photo gallery is created
    createGallery (input: createGalleryInput): Gallery
    # A company is created
    createCompany (input: createCompanyInput): Company
    # The 'item' argument represents the table name and the 'ID' argument represents the row that is to be deleted 
    deleteItem (item: itemToDelete!, ID: Int!): DeleteItem
  }

  # TYPES
  type Account {
    accountID: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String
    phone: Float
    createdAt: String
    company: [Company]
    token: String
  }

  type Photo {
    photoID: ID
    url: String
    description: String
    clickCount: Float
    createdAt: String
  }

  type Gallery {
    galleryID: ID
    title: String
    description: String
    clickCount: Float
    createdAt: String
    photos: [Photo]
  }

  type Company {
    companyID: ID
    name: String
    logo: String
    motto: String
    email: String
    phone: Float
    description: String
    galleries: [Gallery]
  }

  type S3PreSignedURL {
    # The url address where the photo will be uploaded
    url: String
    # This the determined filename
    key: String
  }

  type DeleteItem {
    # The number of items that was deleted. If "0" is returned then the item may not have existed in the first place
    quantityDeleted: Int
  }

  input createAccountInput {
    username: String!
    first_name: String!
    last_name: String!
    password: String!
    email: String
    phone: Float
  }

  input loginInput {
    username: String!
    password: String!
  }

  input photoInput {
    # The S3 presigned URL where the photo was uploaded to 
    url: String!
    # The gallery id of the id the photo should be associated with
    gallery_id: Int!
    # A description of the photo being added to the gallery
    photo_description: String
  }

  input createGalleryInput {
    gallery_title: String
    gallery_description: String
    company_id: Int
  }

  input createCompanyInput {
    company_name: String!
    company_logo: String
    motto: String
    email: String
    phone: String
    company_description: String
  }

  # different things the gallery list can be sorted by
  enum SortGalleryBy {
    galleryID
    title
    clickCount
    createdAt
  }

  # the two directions the the gallery list can be sorted by.
  enum SortOrder {
    # ascending
    asc
    # descending
    desc
  }

  # the the options of items to delete
  enum itemToDelete {
    photo
    gallery
    company
    account
  }
`;
