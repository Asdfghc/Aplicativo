-- 101-seed-auth.sql

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('alice@example.com', 'hashedpwd1', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('bob@example.com', 'hashedpwd2', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('charlie@example.com', 'hashedpwd3', 'ADMIN', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('david@example.com', 'hashedpwd4', 'USER', 'BLOCKED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('eve@example.com', 'hashedpwd5', 'MODERATOR', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('frank@example.com', 'hashedpwd6', 'USER', 'DEACTIVATED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('grace@example.com', 'hashedpwd7', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('heidi@example.com', 'hashedpwd8', 'ADMIN', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('ivan@example.com', 'hashedpwd9', 'USER', 'BLOCKED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('judy@example.com', 'hashedpwd10', 'MODERATOR', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

COMMIT;