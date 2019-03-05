BEGIN TRANSACTION;

CREATE TABLE gallery(

  \c sons_photos

  id SERIAL UNIQUE,
  "title" VARCHAR(50) UNIQUE NOT NULL,
  "galleryDescription" TEXT,
  "clickCount" BIGINT DEFAULT 0,
  "accountID" INTEGER REFERENCES account (id) ON DELETE CASCADE NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

COMMIT;
