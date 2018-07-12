DROP DATABASE IF EXISTS sons_photos;
CREATE DATABASE sons_photos;

\c sons_photos;

CREATE TABLE account(
  account_id SERIAL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE company(
  company_id SERIAL UNIQUE,
  company_name VARCHAR(50) NOT NULL,
  company_logo TEXT,
  motto TEXT,
  email VARCHAR(100),
  phone VARCHAR(50),
  company_description TEXT,
  account_id INTEGER REFERENCES account(account_id)
);

CREATE TABLE gallery(
  gallery_id SERIAL UNIQUE,
  gallery_title VARCHAR(50) UNIQUE NOT NULL,
  gallery_description VARCHAR(50),
  click_count BIGINT DEFAULT 0,
  company_id INTEGER REFERENCES company (company_id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE photo(
  photo_id SERIAL UNIQUE,
  url TEXT UNIQUE NOT NULL,
  photo_description TEXT,
  gallery_id INTEGER REFERENCES gallery (gallery_id) NOT NULL,
  click_count BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
