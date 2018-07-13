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
CREATE VIEW photo_view AS
SELECT
	photo_id AS "photoID",
	url,
	photo_description AS description,
	click_count AS "clickCount",
	created_at AS "createdAt"
FROM photo;