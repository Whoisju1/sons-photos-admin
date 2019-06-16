BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS company (
  \c sons_photos


  id SERIAL UNIQUE,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "about" TEXT,
  "editedBy" INTEGER REFERENCES account (id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "lastModified" TIMESTAMP DEFAULT NOW()
);

COMMIT;

-- Add initial data to company table

BEGIN TRANSACTION;

INSERT INTO company (
  name,
  about
) VALUES (
  'Sons Photos',
  'Please give a description of Sons Photos'
);

COMMIT;
