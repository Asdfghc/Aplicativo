-- 104-create-comments.sql
CREATE TABLE Comments (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    post_id INTEGER,
    user_id INTEGER,
    replied_comment_id INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT comments_fk_post_id FOREIGN KEY (post_id) REFERENCES Posts(id) 
        ON DELETE CASCADE,
    CONSTRAINT comments_fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id) 
        ON DELETE CASCADE,
    CONSTRAINT comments_fk_replied_comment_id FOREIGN KEY (replied_comment_id) REFERENCES Comments(id)
        ON DELETE SET NULL,
    CONSTRAINT comments_chk_post_id CHECK (post_id IS NOT NULL), -- Postagem_ID não pode ser nulo
    CONSTRAINT comments_chk_user_id CHECK (user_id IS NOT NULL), -- Usuario_ID não pode ser nulo
    CONSTRAINT comments_chk_content CHECK (content IS NOT NULL AND LENGTH(content) > 0) -- Conteúdo não pode ser vazio
    -- CONSTRAINT comments_chk_created_at CHECK (updated_at IS NOT NULL AND updated_at <= CURRENT_TIMESTAMP),
    -- CONSTRAINT comments_chk_updated_at CHECK (created_at IS NOT NULL AND created_at <= CURRENT_TIMESTAMP),
    -- CONSTRAINT comments_chk_deleted_at CHECK (deleted_at IS NULL OR deleted_at <= CURRENT_TIMESTAMP),
)
-- TODO: Add trigger to Updated_at
;