CREATE TABLE IF NOT EXISTS authorized_admins
(
	admin_id		BIGSERIAL NOT NULL,
	isPermitted		BOOLEAN NOT NULL,
	permission_id	BIGSERIAL NOT NULL,

	CONSTRAINT author_admins_auth_id_fkey 
		FOREIGN KEY (admin_id) 
		REFERENCES public.admin_users(admin_id),

	CONSTRAINT author_admins_permission_id_fkey 
		FOREIGN KEY (permission_id) 
		REFERENCES public.admin_permissions(permission_id)

);
