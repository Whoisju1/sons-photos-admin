BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS contact (

  \c sons_photos

  id SERIAL UNIQUE,
  about TEXT,
  phone  VARCHAR(50),
  "companyId" INTEGER REFERENCES company (id) ON DELETE CASCADE,
  email  VARCHAR(50),
  "lastModified" TIMESTAMP DEFAULT NOW()
);

COMMIT;
