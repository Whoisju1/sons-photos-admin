type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Password: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Account = {
  id: Scalars["ID"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["Float"]>;
  role?: Maybe<Role>;
  createdAt?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
};

export type AddPhotoInput = {
  /** The S3 presigned URL where the photo was uploaded to */
  url: Scalars["String"];
  /** A description of the photo being added to the gallery */
  description?: Maybe<Scalars["String"]>;
  /** filename to be saved in database to reference when deleting photo from AWS bucket */
  filename: Scalars["String"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type CreateAccountInput = {
  username: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
  phone?: Maybe<Scalars["String"]>;
  role: Role;
};

export type CreateGalleryInput = {
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type DeletedGallery = {
  id?: Maybe<Scalars["String"]>;
};

export type DeleteItem = {
  /** The number of items that was deleted. If 0 is returned then the item may not have existed in the first place */
  quantityDeleted?: Maybe<Scalars["Int"]>;
};

export type EditUserInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  role?: Maybe<Role>;
};

export type Gallery = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  clickCount?: Maybe<Scalars["Float"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Account>;
  photos?: Maybe<Array<Maybe<Photo>>>;
};

/** the the options of items to delete */
export enum ItemToDelete {
  Photo = "photo",
  Gallery = "gallery",
  Company = "company",
  Account = "account"
}

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  /** User is signed up and user information is provided */
  createAccount: Account;
  /** Edit Own User Information */
  editAccountOwn: Account;
  /** A Photo is added to the gallery of choice */
  addPhotos: Array<Photo>;
  /** A photo gallery is created */
  createGallery: Gallery;
  /** Photo is deleted from S3 bucket and database */
  deletePhoto?: Maybe<Array<Maybe<Photo>>>;
  /** Deletes the selected gallery and all the photos inside of it */
  deleteGallery?: Maybe<DeletedGallery>;
  /** The 'item' argument represents the table name and the 'ID' argument represents the row that is to be deleted */
  deleteItem?: Maybe<DeleteItem>;
  /** Change password */
  changePassword?: Maybe<Account>;
};

export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

export type MutationEditAccountOwnArgs = {
  input: EditUserInput;
};

export type MutationAddPhotosArgs = {
  galleryID: Scalars["ID"];
  input: Array<AddPhotoInput>;
};

export type MutationCreateGalleryArgs = {
  input: CreateGalleryInput;
};

export type MutationDeletePhotoArgs = {
  filenames: Array<Scalars["String"]>;
};

export type MutationDeleteGalleryArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteItemArgs = {
  item: ItemToDelete;
  ID: Scalars["ID"];
};

export type MutationChangePasswordArgs = {
  password?: Maybe<Scalars["Password"]>;
};

export type Photo = {
  id: Scalars["ID"];
  url?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  addedBy?: Maybe<Account>;
  clickCount?: Maybe<Scalars["Float"]>;
  createdAt?: Maybe<Scalars["String"]>;
  filename?: Maybe<Scalars["String"]>;
  gallery?: Maybe<Gallery>;
};

export type Query = {
  getAccount?: Maybe<Account>;
  /** user is logged in and user information is provided */
  login: Account;
  /** All the galleries are provided */
  getGalleries?: Maybe<Array<Maybe<Gallery>>>;
  /** the gallery for the given 'id' is provided */
  getGallery: Gallery;
  /** The photo for the given 'id' is provided */
  getPhoto: Photo;
  /** This query provides a presigned URL from AWS S3 which is as the address where the file is uploaded */
  s3PreSignedURLs: Array<S3PreSignedUrl>;
};

export type QueryLoginArgs = {
  input: LoginInput;
};

export type QueryGetGalleriesArgs = {
  sortOrder?: Maybe<SortOrder>;
  sortBy?: Maybe<SortGalleryBy>;
};

export type QueryGetGalleryArgs = {
  id: Scalars["ID"];
};

export type QueryGetPhotoArgs = {
  id: Scalars["String"];
};

export type QueryS3PreSignedUrLsArgs = {
  filenames: Array<Scalars["String"]>;
};

/** the various account types */
export enum Role {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Viewer = "VIEWER"
}

export type S3PreSignedUrl = {
  /** The url address where the photo will be uploaded */
  url?: Maybe<Scalars["String"]>;
  /** This the determined filename */
  key?: Maybe<Scalars["String"]>;
};

/** different things the gallery list can be sorted by */
export enum SortGalleryBy {
  Id = "id",
  Title = "title",
  ClickCount = "clickCount",
  CreatedAt = "createdAt"
}

export enum SortOrder {
  /** ascending */
  Asc = "asc",
  /** descending */
  Desc = "desc"
}

export type AddGalleryMutationVariables = {
  galleryDetails: CreateGalleryInput;
};

export type AddGalleryMutation = { __typename?: "Mutation" } & {
  createGallery: { __typename?: "Gallery" } & Pick<
    Gallery,
    "id" | "title" | "description"
  >;
};

export type LoginUserQueryVariables = {
  credentials: LoginInput;
};

export type LoginUserQuery = { __typename?: "Query" } & {
  login: { __typename?: "Account" } & Pick<Account, "token">;
};

export type CreateAccountMutationVariables = {
  userInfo: CreateAccountInput;
};

export type CreateAccountMutation = { __typename?: "Mutation" } & {
  createAccount: { __typename?: "Account" } & Pick<
    Account,
    "token" | "username" | "firstName" | "lastName"
  >;
};

export type SavePhotoInfoMutationVariables = {
  galleryID: Scalars["ID"];
  photoInfo: Array<AddPhotoInput>;
};

export type SavePhotoInfoMutation = { __typename?: "Mutation" } & {
  addPhotos: Array<
    { __typename?: "Photo" } & Pick<
      Photo,
      "id" | "url" | "description" | "filename"
    >
  >;
};

export type GetPresignedUrlsQueryVariables = {
  filenames: Array<Scalars["String"]>;
};

export type GetPresignedUrlsQuery = { __typename?: "Query" } & {
  s3PreSignedURLs: Array<
    { __typename?: "S3PreSignedURL" } & Pick<S3PreSignedUrl, "url" | "key">
  >;
};

export type GetAccountInfoQueryVariables = {};

export type GetAccountInfoQuery = { __typename?: "Query" } & {
  getAccount: Maybe<
    { __typename?: "Account" } & Pick<
      Account,
      "id" | "firstName" | "lastName" | "email" | "phone" | "username" | "role"
    >
  >;
};

export type GetGalleriesQueryVariables = {};

export type GetGalleriesQuery = { __typename?: "Query" } & {
  getGalleries: Maybe<
    Array<
      Maybe<
        { __typename?: "Gallery" } & Pick<
          Gallery,
          "id" | "title" | "description"
        >
      >
    >
  >;
};

export type GetGalleryQueryVariables = {
  id: Scalars["ID"];
};

export type GetGalleryQuery = { __typename?: "Query" } & {
  getGallery: { __typename?: "Gallery" } & Pick<Gallery, "id" | "title">;
};
