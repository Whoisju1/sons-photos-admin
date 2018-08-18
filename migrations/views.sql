\c sons_photos;

DROP VIEW IF EXISTS account_view; 

-- CREATE VIEW FOR RETRIEVING ACCOUNTS
CREATE VIEW account_view AS
SELECT
	account_id AS "accountID",
	first_name AS "firstName",
	last_name AS "lastName",
	account_role as "accountRole",
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
	account_id AS "accountID",
	created_at AS "createdAt"
FROM photo;

-- CREATE VIEW FOR VIEWING GALLLERIES
DROP VIEW IF EXISTS gallery_view; 

CREATE VIEW gallery_view AS
SELECT
	gallery_id AS "galleryID",
	gallery_title AS "title",
	gallery_description AS description,
	click_count AS "clickCount",
	account_id AS "accountID",
	created_at AS "createdAt"
FROM gallery;