import { gql } from 'apollo-server-express';

export interface IGallery {
  galleryID: string;
  galleryTitle: string;
  description: string;
  clickCount: number;
  createdAt: string;
  createdBy: IAccount;
  photos: IPhoto;
}

export interface IPhoto {
  photoID: string;
  url: string;
  photoDescription: string;
  addedBy: IAccount;
  clickCount: number;
  createdAt: string;
  filename: string;
  gallery: IGallery;
}

export interface IAccount {
  accountID: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  token: string;
}

export interface IDeletedGallery {
  galleryID: string;
}

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export default gql`
  directive @authorization (scope: [Role]) on OBJECT | FIELD_DEFINITION
# ROOT TYPES
  type Query {
    # Information for the current user is provided - Authentication Required
    account: Account @authorization(scope: [SUPER_ADMIN, ADMIN])
    "All the galleries are provided"
    galleries(sortOrder: SortOrder, sortBy: SortGalleryBy): [Gallery]
    "the gallery for the given 'galleryID' is provided"
    gallery (galleryID: ID!): Gallery
    "The photo for the given 'photoID' is provided"
    getPhoto(photoID: String!): Photo
    "user is logged in and user information is provided"
    login (input: loginInput!): Account
    "This query provides a presigned URL from AWS S3 which is as the address where the file is uploaded"
    s3PreSignedURL (filename: String!): S3PreSignedURL
  }

  type Mutation {
    "User is signed up and user information is provided"
    createAccount(input: createAccountInput!): Account
    "A Photo is added to the gallery of choice"
    addPhoto (input: photoInput!): Photo @authorization(scope: [SUPER_ADMIN, ADMIN])
    "A photo gallery is created"
    createGallery (input: createGalleryInput!): Gallery @authorization(scope: [SUPER_ADMIN, ADMIN])
    "The 'item' argument represents the table name and the 'ID' argument represents the row that is to be deleted"
    deleteItem (item: itemToDelete!, ID: ID!): DeleteItem @authorization(scope: [SUPER_ADMIN, ADMIN])
    "Photo is deleted from S3 bucket and database"
    deletePhoto(filenames: [String]!): [Photo] @authorization(scope: [SUPER_ADMIN, ADMIN])
    "Deletes the selected gallery and all the photos inside of it"
    deleteGallery(galleryID: ID!): DeletedGallery @authorization(scope: [SUPER_ADMIN, ADMIN])
    # sendEmail(input: emailInput!): Email
  }

  # TYPES
  type Account {
    accountID: ID
    firstName: String
    lastName: String
    username: String
    email: String
    phone: Float
    role: Role
    createdAt: String
    token: String
  }

  type Photo {
    photoID: ID
    url: String
    photoDescription: String
    addedBy: Account @authorization(scope: [SUPER_ADMIN, ADMIN])
    clickCount: Float @authorization(scope: [SUPER_ADMIN, ADMIN])
    createdAt: String
    filename: String
    gallery: Gallery
  }

  type Gallery {
    galleryID: ID
    galleryTitle: String
    description: String
    clickCount: Float @authorization(scope: [SUPER_ADMIN, ADMIN])
    createdAt: String
    createdBy: Account @authorization(scope: [SUPER_ADMIN, ADMIN])
    photos: [Photo]
  }

  type S3PreSignedURL @authorization(scope: [SUPER_ADMIN, ADMIN]) {
    "The url address where the photo will be uploaded"
    url: String
    "This the determined filename"
    key: String
  }

#   type Envelope {
#     from: String
#     to: String
#   }

#   type Email {
#     accepted: [String]
#     rejected: [String]
#     envelopeTime: Int
#     messageTime: Int
#     messageSize: Int
#     response: String
#     envelope: Envelope
#     messageId: ID
# }

  type DeleteItem @authorization(scope: [SUPER_ADMIN, ADMIN]) {
    "The number of items that was deleted. If 0 is returned then the item may not have existed in the first place"
    quantityDeleted: Int
  }

  type DeletedGallery @authorization(scope: [SUPER_ADMIN, ADMIN]) {
    galleryID: String
  }

  # input emailInput {
  #   to: String!
  #   content: String!
  #   subject: String!
  # }

  input createAccountInput {
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    phone: String
    role: Role!
  }

  input loginInput {
    username: String!
    password: String!
  }

  input photoInput {
    "The S3 presigned URL where the photo was uploaded to"
    url: String!
    "The gallery id of the id the photo should be associated with"
    galleryID: ID!
    "A description of the photo being added to the gallery"
    photoDescription: String
    "filename to be saved in database to reference when deleting photo from AWS bucket"
    filename: String!
  }

  input createGalleryInput {
    galleryTitle: String
    galleryDescription: String
  }

  "different things the gallery list can be sorted by"
  enum SortGalleryBy {
    galleryID
    title
    clickCount
    createdAt
  }

  # the two directions the the gallery list can be sorted by.
  enum SortOrder {
    "ascending"
    asc
    "descending"
    desc
  }

  "the the options of items to delete"
  enum itemToDelete {
    photo
    gallery
    company
    account
  }

  "the various account types"
  enum Role {
    SUPER_ADMIN
    ADMIN
    USER
  }
`;
