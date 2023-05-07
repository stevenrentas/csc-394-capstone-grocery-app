CREATE TABLE IF NOT EXISTS auth_users
(
	id			BIGSERIAL NOT NULL,
	username	VARCHAR(50) NOT NULL,

	CONSTRAINT auth_users_id_fkey FOREIGN KEY(id) REFERENCES public.users(id)
);