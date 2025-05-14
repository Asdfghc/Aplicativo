-- 005-seed-private-messages.sql

-- Chat 1: sender_user_id 1 e receiver_user_id 2
INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (1, 1, 'Olá, como você está?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (1, 2, 'Estou bem, e você?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (1, 1, 'Estou ótimo, obrigado por perguntar!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- Chat 2: sender_user_id 2 e receiver_user_id 3
INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (2, 2, 'Oi, você viu meu último post?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (2, 3, 'Sim, vi. Está muito interessante!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (2, 2, 'Que bom que gostou, obrigada!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- Chat 3: sender_user_id 3 e receiver_user_id 4
INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (3, 3, 'Oi, vamos marcar de sair esse fim de semana?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (3, 4, 'Claro, estou dentro! Quando você sugere?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (3, 3, 'Que tal no sábado à tarde?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- Chat 4: sender_user_id 4 e receiver_user_id 5
INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (4, 4, 'Ei, você viu meu novo perfil?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (4, 5, 'Vi sim, ficou muito bom!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (4, 4, 'Que bom que gostou, estou tentando algo novo!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- Chat 5: sender_user_id 5 e receiver_user_id 1
INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (5, 5, 'Oi, precisamos conversar sobre o projeto.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (5, 1, 'Claro, me avise quando estiver disponível.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO PrivateMessages (chat_id, sender_user_id, content, created_at, updated_at, deleted_at)
VALUES (5, 5, 'Estarei disponível amanhã à tarde. Podemos nos falar então?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

