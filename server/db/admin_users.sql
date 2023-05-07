CREATE TABLE IF NOT EXISTS admin_users
(
	admin_id	BIGSERIAL NOT NULL,
	pword		VARCHAR(50) NOT NULL,
	isSuperuser	BOOLEAN NOT NULL,
	username	VARCHAR(50) NOT NULL,
	email		VARCHAR(50) NOT NULL,

	CONSTRAINT admin_id_pkey PRIMARY KEY (admin_id)
);
-------TEST SAMPLES------
INSERT INTO admin_users(pword,isSuperuser,username,email)
	VALUES ('password',true,'eaguir','eaguir13@depaul.edu');

INSERT INTO admin_users(pword,isSuperuser,username,email)
	VALUES ('password123',false,'test123','test123@depaul.edu');