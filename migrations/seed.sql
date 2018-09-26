DROP DATABASE IF EXISTS sons_photos;
CREATE DATABASE sons_photos;

\c sons_photos;

DROP TABLE IF EXISTS account;

CREATE TABLE account(
  "accountID" SERIAL UNIQUE,
  "firstName" VARCHAR(50) NOT NULL,
  "lastName" VARCHAR(50) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  "createdAt" TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS gallery;

CREATE TABLE gallery(
  "galleryID" SERIAL UNIQUE,
  "galleryTitle" VARCHAR(50) UNIQUE NOT NULL,
  "galleryDescription" TEXT,
  "clickCount" BIGINT DEFAULT 0,
  "accountID" INTEGER REFERENCES account ("accountID") ON DELETE CASCADE NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS photo;

CREATE TABLE photo(
  "photoID" SERIAL UNIQUE,
  filename TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  "photoDescription" TEXT,
  "galleryID" INTEGER REFERENCES gallery ("galleryID") ON DELETE CASCADE NOT NULL,
  "accountID" INTEGER REFERENCES account ("accountID") ON DELETE CASCADE NOT NULL,
  "clickCount" BIGINT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);
