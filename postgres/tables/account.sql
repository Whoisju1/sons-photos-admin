BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS account (
  id SERIAL UNIQUE,
  "firstName" VARCHAR(50) NOT NULL,
  "lastName" VARCHAR(50) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  "createdAt" TIMESTAMP DEFAULT NOW()
);

COMMIT;

BEGIN TRANSACTION;

INSERT INTO account (
  "firstName",
  "lastName",
  username,
  password,
  email,
  role,
  phone
) VALUES (
  'Julien',
  'John-Charles',
  'son',
  'root',
  'whoisju1@gmail.com',
  'SUPER_ADMIN',
  '0000000000'
);

COMMIT;