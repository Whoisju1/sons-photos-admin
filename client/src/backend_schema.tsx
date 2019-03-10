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

export interface PhotoInput {
  /** The S3 presigned URL where the photo was uploaded to */
  url: string;
  /** The gallery id of the id the photo should be associated with */
  id: string;
  /** A description of the photo being added to the gallery */
  description?: Maybe<string>;
  /** filename to be saved in database to reference when deleting photo from AWS bucket */
  filename: string;
}

export interface CreateGalleryInput {
  title?: Maybe<string>;

  galleryDescription?: Maybe<string>;
}
/** the various account types */
export enum Role {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  User = "USER"
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
