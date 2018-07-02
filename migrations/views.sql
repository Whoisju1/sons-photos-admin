\c sons_photos;

DROP VIEW IF EXISTS account_view; 

CREATE VIEW account_view AS
SELECT
	account_id AS "accoundID",
	first_name AS "firstName",
	last_name AS "lastName",
	username,
	email,
	phone,
	TO_CHAR(created_at :: DATE, 'Mon dd, yyyy') AS "createdAt"
FROM account;