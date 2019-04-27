BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS gallery (

  \c sons_photos

  id SERIAL UNIQUE,
  "title" VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  "clickCount" BIGINT DEFAULT 0,
  thumbnail TEXT,
  "accountID" INTEGER REFERENCES account (id) ON DELETE CASCADE NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

COMMIT;
