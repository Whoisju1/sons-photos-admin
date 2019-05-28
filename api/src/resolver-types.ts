export type Maybe<T> = T | null;

export interface LoginInput {
  username: string;

  password: string;
}

export interface CreateAccountInput {
  username: string;

  firstName: string;

  lastName: string;

  password: string;

  email: string;

  phone?: Maybe<string>;

  role: Role;
}

export interface EditUserInput {
  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<string>;

  role?: Maybe<Role>;
}

export interface AddPhotoInput {
  /** The S3 presigned URL where the photo was uploaded to */
  url: string;
  /** A description of the photo being added to the gallery */
  description?: Maybe<string>;
  /** filename to be saved in database to reference when deleting photo from AWS bucket */
  filename: string;
}

export interface CreateGalleryInput {
  title: string;

  description?: Maybe<string>;

  thumbnail?: Maybe<string>;
}
/** the various account types */
export enum Role {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Viewer = "VIEWER"
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc"
}
/** different things the gallery list can be sorted by */
export enum SortGalleryBy {
  Id = "id",
  Title = "title",
  ClickCount = "clickCount",
  CreatedAt = "createdAt"
}
/** the the options of items to delete */
export enum ItemToDelete {
  Photo = "photo",
  Gallery = "gallery",
  Company = "company",
  Account = "account"
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Password = any;

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  getAccount?: Maybe<Account>;
  /** user is logged in and user information is provided */
  login: Account;
  /** All the galleries are provided */
  getGalleries: Gallery[];
  /** the gallery for the given 'id' is provided */
  getGallery: Gallery;
  /** The photo for the given 'id' is provided */
  getPhoto: Photo;
  /** This query provides a presigned URL from AWS S3 which is as the address where the file is uploaded */
  s3PreSignedURLs: S3PreSignedUrl[];
}

export interface Account {
  id: string;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  username?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<number>;

  role?: Maybe<Role>;

  createdAt?: Maybe<string>;

  token?: Maybe<string>;
}

export interface Gallery {
  id: string;

  title: string;

  description?: Maybe<string>;

  clickCount?: Maybe<number>;

  thumbnail?: Maybe<string>;

  createdAt?: Maybe<string>;

  createdBy?: Maybe<Account>;

  photos?: Maybe<(Maybe<Photo>)[]>;

  count?: Maybe<number>;
}

export interface Photo {
  id: string;

  url?: Maybe<string>;

  description?: Maybe<string>;

  addedBy?: Maybe<Account>;

  clickCount?: Maybe<number>;

  createdAt?: Maybe<string>;

  filename?: Maybe<string>;

  gallery?: Maybe<Gallery>;
}

export interface S3PreSignedUrl {
  /** The url address where the photo will be uploaded */
  url?: Maybe<string>;
  /** This the determined filename */
  key?: Maybe<string>;
}

export interface Mutation {
  /** User is signed up and user information is provided */
  createAccount: Account;
  /** Edit Own User Information */
  editAccountOwn: Account;
  /** A Photo is added to the gallery of choice */
  addPhotos: Photo[];
  /** A photo gallery is created */
  createGallery: Gallery;
  /** Photo is deleted from S3 bucket and database */
  deletePhotos?: Maybe<(Maybe<Photo>)[]>;
  /** Deletes the selected gallery and all the photos inside of it */
  deleteGallery?: Maybe<DeletedGallery>;
  /** The 'item' argument represents the table name and the 'ID' argument represents the row that is to be deleted */
  deleteItem?: Maybe<DeleteItem>;
  /** Change password */
  changePassword?: Maybe<Account>;
}

export interface DeletedGallery {
  id?: Maybe<string>;
}

export interface DeleteItem {
  /** The number of items that was deleted. If 0 is returned then the item may not have existed in the first place */
  quantityDeleted?: Maybe<number>;
}

// ====================================================
// Arguments
// ====================================================

export interface LoginQueryArgs {
  input: LoginInput;
}
export interface GetGalleriesQueryArgs {
  sortOrder?: Maybe<SortOrder>;

  sortBy?: Maybe<SortGalleryBy>;
}
export interface GetGalleryQueryArgs {
  title: string;
}
export interface GetPhotoQueryArgs {
  id: string;
}
export interface S3PreSignedUrLsQueryArgs {
  filenames: string[];
}
export interface CreateAccountMutationArgs {
  input: CreateAccountInput;
}
export interface EditAccountOwnMutationArgs {
  input: EditUserInput;
}
export interface AddPhotosMutationArgs {
  galleryTitle: string;

  input: AddPhotoInput[];
}
export interface CreateGalleryMutationArgs {
  input: CreateGalleryInput;
}
export interface DeletePhotosMutationArgs {
  photoIDs: string[];
}
export interface DeleteGalleryMutationArgs {
  id: string;
}
export interface DeleteItemMutationArgs {
  item: ItemToDelete;

  ID: string;
}
export interface ChangePasswordMutationArgs {
  password?: Maybe<Password>;
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface QueryResolvers<TContext = {}, TypeParent = {}> {
  getAccount?: QueryGetAccountResolver<Maybe<Account>, TypeParent, TContext>;
  /** user is logged in and user information is provided */
  login?: QueryLoginResolver<Account, TypeParent, TContext>;
  /** All the galleries are provided */
  getGalleries?: QueryGetGalleriesResolver<Gallery[], TypeParent, TContext>;
  /** the gallery for the given 'id' is provided */
  getGallery?: QueryGetGalleryResolver<Gallery, TypeParent, TContext>;
  /** The photo for the given 'id' is provided */
  getPhoto?: QueryGetPhotoResolver<Photo, TypeParent, TContext>;
  /** This query provides a presigned URL from AWS S3 which is as the address where the file is uploaded */
  s3PreSignedURLs?: QueryS3PreSignedUrLsResolver<
    S3PreSignedUrl[],
    TypeParent,
    TContext
  >;
}

export type QueryGetAccountResolver<
  R = Maybe<Account>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type QueryLoginResolver<
  R = Account,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, QueryLoginArgs>;
export interface QueryLoginArgs {
  input: LoginInput;
}

export type QueryGetGalleriesResolver<
  R = Gallery[],
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, QueryGetGalleriesArgs>;
export interface QueryGetGalleriesArgs {
  sortOrder?: Maybe<SortOrder>;

  sortBy?: Maybe<SortGalleryBy>;
}

export type QueryGetGalleryResolver<
  R = Gallery,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, QueryGetGalleryArgs>;
export interface QueryGetGalleryArgs {
  title: string;
}

export type QueryGetPhotoResolver<
  R = Photo,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, QueryGetPhotoArgs>;
export interface QueryGetPhotoArgs {
  id: string;
}

export type QueryS3PreSignedUrLsResolver<
  R = S3PreSignedUrl[],
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, QueryS3PreSignedUrLsArgs>;
export interface QueryS3PreSignedUrLsArgs {
  filenames: string[];
}

export interface AccountResolvers<TContext = {}, TypeParent = Account> {
  id?: AccountIdResolver<string, TypeParent, TContext>;

  firstName?: AccountFirstNameResolver<Maybe<string>, TypeParent, TContext>;

  lastName?: AccountLastNameResolver<Maybe<string>, TypeParent, TContext>;

  username?: AccountUsernameResolver<Maybe<string>, TypeParent, TContext>;

  email?: AccountEmailResolver<Maybe<string>, TypeParent, TContext>;

  phone?: AccountPhoneResolver<Maybe<number>, TypeParent, TContext>;

  role?: AccountRoleResolver<Maybe<Role>, TypeParent, TContext>;

  createdAt?: AccountCreatedAtResolver<Maybe<string>, TypeParent, TContext>;

  token?: AccountTokenResolver<Maybe<string>, TypeParent, TContext>;
}

export type AccountIdResolver<
  R = string,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountFirstNameResolver<
  R = Maybe<string>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountLastNameResolver<
  R = Maybe<string>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountUsernameResolver<
  R = Maybe<string>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountEmailResolver<
  R = Maybe<string>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountPhoneResolver<
  R = Maybe<number>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountRoleResolver<
  R = Maybe<Role>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountCreatedAtResolver<
  R = Maybe<string>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type AccountTokenResolver<
  R = Maybe<string>,
  Parent = Account,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface GalleryResolvers<TContext = {}, TypeParent = Gallery> {
  id?: GalleryIdResolver<string, TypeParent, TContext>;

  title?: GalleryTitleResolver<string, TypeParent, TContext>;

  description?: GalleryDescriptionResolver<Maybe<string>, TypeParent, TContext>;

  clickCount?: GalleryClickCountResolver<Maybe<number>, TypeParent, TContext>;

  thumbnail?: GalleryThumbnailResolver<Maybe<string>, TypeParent, TContext>;

  createdAt?: GalleryCreatedAtResolver<Maybe<string>, TypeParent, TContext>;

  createdBy?: GalleryCreatedByResolver<Maybe<Account>, TypeParent, TContext>;

  photos?: GalleryPhotosResolver<Maybe<(Maybe<Photo>)[]>, TypeParent, TContext>;

  count?: GalleryCountResolver<Maybe<number>, TypeParent, TContext>;
}

export type GalleryIdResolver<
  R = string,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryTitleResolver<
  R = string,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryDescriptionResolver<
  R = Maybe<string>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryClickCountResolver<
  R = Maybe<number>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryThumbnailResolver<
  R = Maybe<string>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryCreatedAtResolver<
  R = Maybe<string>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryCreatedByResolver<
  R = Maybe<Account>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryPhotosResolver<
  R = Maybe<(Maybe<Photo>)[]>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type GalleryCountResolver<
  R = Maybe<number>,
  Parent = Gallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface PhotoResolvers<TContext = {}, TypeParent = Photo> {
  id?: PhotoIdResolver<string, TypeParent, TContext>;

  url?: PhotoUrlResolver<Maybe<string>, TypeParent, TContext>;

  description?: PhotoDescriptionResolver<Maybe<string>, TypeParent, TContext>;

  addedBy?: PhotoAddedByResolver<Maybe<Account>, TypeParent, TContext>;

  clickCount?: PhotoClickCountResolver<Maybe<number>, TypeParent, TContext>;

  createdAt?: PhotoCreatedAtResolver<Maybe<string>, TypeParent, TContext>;

  filename?: PhotoFilenameResolver<Maybe<string>, TypeParent, TContext>;

  gallery?: PhotoGalleryResolver<Maybe<Gallery>, TypeParent, TContext>;
}

export type PhotoIdResolver<
  R = string,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoUrlResolver<
  R = Maybe<string>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoDescriptionResolver<
  R = Maybe<string>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoAddedByResolver<
  R = Maybe<Account>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoClickCountResolver<
  R = Maybe<number>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoCreatedAtResolver<
  R = Maybe<string>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoFilenameResolver<
  R = Maybe<string>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PhotoGalleryResolver<
  R = Maybe<Gallery>,
  Parent = Photo,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface S3PreSignedUrlResolvers<
  TContext = {},
  TypeParent = S3PreSignedUrl
> {
  /** The url address where the photo will be uploaded */
  url?: S3PreSignedUrlUrlResolver<Maybe<string>, TypeParent, TContext>;
  /** This the determined filename */
  key?: S3PreSignedUrlKeyResolver<Maybe<string>, TypeParent, TContext>;
}

export type S3PreSignedUrlUrlResolver<
  R = Maybe<string>,
  Parent = S3PreSignedUrl,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type S3PreSignedUrlKeyResolver<
  R = Maybe<string>,
  Parent = S3PreSignedUrl,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface MutationResolvers<TContext = {}, TypeParent = {}> {
  /** User is signed up and user information is provided */
  createAccount?: MutationCreateAccountResolver<Account, TypeParent, TContext>;
  /** Edit Own User Information */
  editAccountOwn?: MutationEditAccountOwnResolver<
    Account,
    TypeParent,
    TContext
  >;
  /** A Photo is added to the gallery of choice */
  addPhotos?: MutationAddPhotosResolver<Photo[], TypeParent, TContext>;
  /** A photo gallery is created */
  createGallery?: MutationCreateGalleryResolver<Gallery, TypeParent, TContext>;
  /** Photo is deleted from S3 bucket and database */
  deletePhotos?: MutationDeletePhotosResolver<
    Maybe<(Maybe<Photo>)[]>,
    TypeParent,
    TContext
  >;
  /** Deletes the selected gallery and all the photos inside of it */
  deleteGallery?: MutationDeleteGalleryResolver<
    Maybe<DeletedGallery>,
    TypeParent,
    TContext
  >;
  /** The 'item' argument represents the table name and the 'ID' argument represents the row that is to be deleted */
  deleteItem?: MutationDeleteItemResolver<
    Maybe<DeleteItem>,
    TypeParent,
    TContext
  >;
  /** Change password */
  changePassword?: MutationChangePasswordResolver<
    Maybe<Account>,
    TypeParent,
    TContext
  >;
}

export type MutationCreateAccountResolver<
  R = Account,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationCreateAccountArgs>;
export interface MutationCreateAccountArgs {
  input: CreateAccountInput;
}

export type MutationEditAccountOwnResolver<
  R = Account,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationEditAccountOwnArgs>;
export interface MutationEditAccountOwnArgs {
  input: EditUserInput;
}

export type MutationAddPhotosResolver<
  R = Photo[],
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationAddPhotosArgs>;
export interface MutationAddPhotosArgs {
  galleryTitle: string;

  input: AddPhotoInput[];
}

export type MutationCreateGalleryResolver<
  R = Gallery,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationCreateGalleryArgs>;
export interface MutationCreateGalleryArgs {
  input: CreateGalleryInput;
}

export type MutationDeletePhotosResolver<
  R = Maybe<(Maybe<Photo>)[]>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationDeletePhotosArgs>;
export interface MutationDeletePhotosArgs {
  photoIDs: string[];
}

export type MutationDeleteGalleryResolver<
  R = Maybe<DeletedGallery>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationDeleteGalleryArgs>;
export interface MutationDeleteGalleryArgs {
  id: string;
}

export type MutationDeleteItemResolver<
  R = Maybe<DeleteItem>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationDeleteItemArgs>;
export interface MutationDeleteItemArgs {
  item: ItemToDelete;

  ID: string;
}

export type MutationChangePasswordResolver<
  R = Maybe<Account>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationChangePasswordArgs>;
export interface MutationChangePasswordArgs {
  password?: Maybe<Password>;
}

export interface DeletedGalleryResolvers<
  TContext = {},
  TypeParent = DeletedGallery
> {
  id?: DeletedGalleryIdResolver<Maybe<string>, TypeParent, TContext>;
}

export type DeletedGalleryIdResolver<
  R = Maybe<string>,
  Parent = DeletedGallery,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface DeleteItemResolvers<TContext = {}, TypeParent = DeleteItem> {
  /** The number of items that was deleted. If 0 is returned then the item may not have existed in the first place */
  quantityDeleted?: DeleteItemQuantityDeletedResolver<
    Maybe<number>,
    TypeParent,
    TContext
  >;
}

export type DeleteItemQuantityDeletedResolver<
  R = Maybe<number>,
  Parent = DeleteItem,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export type AuthorizationDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  AuthorizationDirectiveArgs,
  {}
>;
export interface AuthorizationDirectiveArgs {
  scope?: Maybe<(Maybe<Role>)[]>;
}

export type CacheControlDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  CacheControlDirectiveArgs,
  {}
>;
export interface CacheControlDirectiveArgs {
  maxAge?: Maybe<number>;

  scope?: Maybe<CacheControlScope>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/). */
  reason?: string;
}

export interface PasswordScalarConfig
  extends GraphQLScalarTypeConfig<Password, any> {
  name: "Password";
}
export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<Upload, any> {
  name: "Upload";
}

export type IResolvers<TContext = {}> = {
  Query?: QueryResolvers<TContext>;
  Account?: AccountResolvers<TContext>;
  Gallery?: GalleryResolvers<TContext>;
  Photo?: PhotoResolvers<TContext>;
  S3PreSignedUrl?: S3PreSignedUrlResolvers<TContext>;
  Mutation?: MutationResolvers<TContext>;
  DeletedGallery?: DeletedGalleryResolvers<TContext>;
  DeleteItem?: DeleteItemResolvers<TContext>;
  Password?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  authorization?: AuthorizationDirectiveResolver<Result>;
  cacheControl?: CacheControlDirectiveResolver<Result>;
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
