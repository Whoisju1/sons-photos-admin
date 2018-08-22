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
  role VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gallery(
  gallery_id SERIAL UNIQUE,
  gallery_title VARCHAR(50) UNIQUE NOT NULL,
  gallery_description TEXT,
  click_count BIGINT DEFAULT 0,
  account_id INTEGER REFERENCES account (account_id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE photo(
  photo_id SERIAL UNIQUE,
  url TEXT UNIQUE NOT NULL,
  photo_description TEXT,
  gallery_id INTEGER REFERENCES gallery (gallery_id) ON DELETE CASCADE NOT NULL,
  account_id INTEGER REFERENCES account (account_id) ON DELETE CASCADE NOT NULL,
  click_count BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
