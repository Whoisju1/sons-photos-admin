\c sons_photos;

DROP VIEW IF EXISTS account_view; 

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