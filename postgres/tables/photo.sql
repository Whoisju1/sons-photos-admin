BEGIN TRANSACTION;

\c sons_photos

CREATE TABLE IF NOT EXISTS photo (
  id SERIAL UNIQUE,
  filename TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  "description" TEXT,
  "galleryID" INTEGER REFERENCES gallery (id) ON DELETE CASCADE NOT NULL,
  "accountID" INTEGER REFERENCES account (id) ON DELETE CASCADE NOT NULL,
  "clickCount" BIGINT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

COMMIT;