\c sons_photos;

DROP VIEW IF EXISTS account_view; 

-- CREATE VIEW FOR RETRIEVING ACCOUNTS
CREATE VIEW account_view AS
SELECT
	account_id AS "accountID",
	first_name AS "firstName",
	last_name AS "lastName",
	username,
	password,
	email,
	phone,
	TO_CHAR(created_at :: DATE, 'Mon dd, yyyy') AS "createdAt"
FROM account;

-- CREATE VIEW FOR RETRIEVING PHOTOS
DROP VIEW IF EXISTS photo_view; 

CREATE VIEW photo_view AS
SELECT
	photo_id AS "photoID",
	url,
	photo_description AS description,
	click_count AS "clickCount",
	gallery_id AS "galleryID",
	created_at AS "createdAt"
FROM photo;

-- CREATE VIEW FOR VIEWING COMPANIES
DROP VIEW IF EXISTS company_view; 

CREATE VIEW company_view AS
SELECT
	company_id AS "companyID",
	company_name AS name,
	company_logo AS logo,
	motto,
	email,
	phone,
	company_description AS description,
	account_id as "AccountID"
FROM company;


-- CREATE VIEW FOR VIEWING GALLLERIES
DROP VIEW IF EXISTS gallery_view; 

CREATE VIEW gallery_view AS
SELECT
	gallery_id AS "galleryID",
	gallery_title AS "title",
	gallery_description AS description,
	click_count AS "clickCount",
	company_id AS "companyID",
	created_at AS "createdAt"
FROM gallery;