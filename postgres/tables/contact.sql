BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS contact (

  \c sons_photos

  id SERIAL UNIQUE,
  phone  VARCHAR(50),
  "companyId" INTEGER REFERENCES company (id) ON DELETE CASCADE,
  email  VARCHAR(50),
  "lastModified" TIMESTAMP DEFAULT NOW()
);

COMMIT;

BEGIN TRANSACTION;

  INSERT INTO contact(
    "companyId",
    phone,
    email
  ) VALUES (
    1,
    'PLEASE SET PHONE NUMBER',
    'PLEASE SET EMAIL ADDRESS'
  );

COMMIT;
