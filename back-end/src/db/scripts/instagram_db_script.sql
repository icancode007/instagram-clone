-- TO CREATE THE SPECIFIC DB FROM ANYWHERE IN THE TERMINAL I RUN createdb db_name_here             <-- note: POSTGRES ONLY
-- TO START SCRIPT IN THE SPECIFIC DB I RUN psql -d your-db-Name -U your-db-username -f file_name_here
-- psql -d Pkt_rguez -U Pkt_rguez -f ~/Desktop/instagram-clone/back-end/src/db/scripts/instagram_db_script.sql  <-- sample cmnd
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	phone_number TEXT,
	email TEXT,
	full_name TEXT NOT NULL,
	password TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE(username),
	UNIQUE(phone_number),
	UNIQUE(email)
);

CREATE TRIGGER set_timestamp
	BEFORE UPDATE ON users
	FOR EACH ROW
	EXECUTE PROCEDURE trigger_set_timestamp();
