CREATE TABLE IF NOT EXISTS admin_permissions
(
	permission_id		BIGSERIAL NOT NULL,
	permission_name		VARCHAR(50) NOT NULL,
	content_type_id		VARCHAR(50) NOT NULL,

	CONSTRAINT admin_permissions_permission_id_pkey 
		PRIMARY KEY (permission_id)
);
-------TEST SAMPLES-------
INSERT INTO admin_permissions(permission_id,permission_name,content_type_id)
	VALUES (default,'can add user',1);