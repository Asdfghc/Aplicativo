-- 004-seed-private-chats.sql

INSERT INTO PrivateChats (sender_user_id, receiver_user_id, created_at, updated_at, deleted_at)
VALUES (1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateChats (sender_user_id, receiver_user_id, created_at, updated_at, deleted_at)
VALUES (2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateChats (sender_user_id, receiver_user_id, created_at, updated_at, deleted_at)
VALUES (3, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateChats (sender_user_id, receiver_user_id, created_at, updated_at, deleted_at)
VALUES (4, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateChats (sender_user_id, receiver_user_id, created_at, updated_at, deleted_at)
VALUES (5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
