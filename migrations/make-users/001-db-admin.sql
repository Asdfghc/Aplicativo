-- 001-db-admin.sql
-- Create the admin user
CREATE USER admin IDENTIFIED BY admin;

-- Grant necessary privileges
-- Optional: Grant more privileges if needed (e.g., creating sequences, triggers)
GRANT CREATE TABLE, CREATE SESSION, CREATE SEQUENCE, CREATE TRIGGER TO admin;

-- Allow the user to use unlimited space on the USERS tablespace
ALTER USER admin QUOTA UNLIMITED ON users;