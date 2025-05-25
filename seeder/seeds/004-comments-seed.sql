-- 104-seed-comments.sql

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (1, 1, NULL, 'Cachorro encontrado! Vou dar notícias se ele for meu!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (1, 2, NULL, 'Estou procurando por ele também! Vou avisar se encontrar.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (2, 3, NULL, 'Que bom que encontrou! Vamos dar uma olhada nele.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (3, 4, NULL, 'Esse é o meu cachorro, ele está perdido há dias!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (3, 5, NULL, 'Que bom que o encontraram! Ele vai ficar bem.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (4, 6, NULL, 'Gato encontrado! Espero que o dono o esteja procurando.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (5, 7, NULL, 'Perdi um gato muito parecido, espero que ele seja encontrado.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (6, 8, NULL, 'Esse cachorro parece estar perdido há mais tempo, vamos ver.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (7, 9, NULL, 'Vi um cachorro com essas características ontem. Vou verificar!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (8, 10, NULL, 'Esse gato é igualzinho ao que encontrei mês passado, vou checar!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (9, 1, NULL, 'Que bom que encontraram, ele estava perdido há um tempo.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (10, 2, NULL, 'Achei que ele tinha fugido, mas agora que sei, vou procurar!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- Comentário respondendo outro
INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (1, 3, 1, 'Eu também vi um cachorro parecido. Estava na rua da escola.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (2, 4, 2, 'Sim, vamos nos reunir e procurar por ele mais tarde.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (3, 5, 3, 'O nome dele é Max! Eu espero que ele esteja bem!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (4, 6, 4, 'Eu sou a dona dele! Estou esperando ele voltar.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (5, 7, 5, 'Você viu ele por aqui? Está difícil de encontrar!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (6, 8, 6, 'Ele já apareceu em outros posts! Devem estar procurando em outros bairros.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (7, 9, 7, 'Alguém aqui viu um cachorro com coleira verde? Pode ser o mesmo!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Comments (post_id, user_id, replied_comment_id, content, created_at, updated_at, deleted_at)
VALUES (8, 10, 8, 'Estou tentando achar o dono, é bom saber que ele está bem.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
