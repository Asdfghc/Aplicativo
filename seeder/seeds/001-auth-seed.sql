-- 101-seed-auth.sql
-- Password: 12341
INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('alice@example.com', '$2b$10$KXcOsJwYDy3zTGRRLz1cVeMebDbLlEWSbF/qGG7HdUji2xDyGhxta', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('bob@example.com', '$2b$10$GhcZL5uxKep9KMRhpxtfPe5sS6/r7LBDfyFmllshN2uOlsvm9d.YS', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('charlie@example.com', '$2b$10$Hwsf.JeN1GZKx8PtkycAaOO7OA2cifRFOlYgJppbLKDauqBikfeOK', 'ADMIN', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('david@example.com', '$2b$10$jArs3X7BzZgLRk0uqw3GOu5hZa2KtJ4Ozjqxnw3bTonpP3whAiVMi', 'USER', 'BLOCKED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('eve@example.com', '$2b$10$P7hGbWRNPLwpopP/EC5Iqes4OKfotvLkG/vFvAGyQu5T5wjChxlze', 'MODERATOR', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('frank@example.com', '$2b$10$xXjjWVf2RDoH2LOAnlcMnODy.YNfts2JJhPJoK19GZn6g27ETPX3i', 'USER', 'DEACTIVATED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('grace@example.com', '$2b$10$bDyCAzgwwF3qVd5dNnv4Te5cHEQ1iTz1haj1d9V0h3hpS.bScZ2bO', 'USER', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('heidi@example.com', '$2b$10$4XLwiOdKx7aEDWM5RPDD.u3pibjeVRQ.f.gz8049wYbHwvET50N46', 'ADMIN', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('ivan@example.com', '$2b$10$3WyPCymhTPf2YFFRwX5UTOzyVkdKWl8T9rdgXty6ULET75RZo4W2G', 'USER', 'BLOCKED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Auth (username, hashed_pwd, role, status, last_login, created_at, updated_at, deleted_at)
VALUES ('judy@example.com', '$2b$10$1z.7.7Y20MOfDsHxa/CPruuCiUgTJHwTuwDo3NTmAgH/BHvv4muGe', 'MODERATOR', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

COMMIT;