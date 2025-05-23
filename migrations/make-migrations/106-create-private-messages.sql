-- 005-create-messages.sql

DROP TABLE PrivateMessages CASCADE CONSTRAINTS;

CREATE TABLE PrivateMessages (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    chat_id INTEGER,
    sender_user_id INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT private_messages_fk_chat_id FOREIGN KEY (chat_id) REFERENCES PrivateChats(id) 
        ON DELETE CASCADE,
    CONSTRAINT private_messages_fk_sender_user_id FOREIGN KEY (sender_user_id) REFERENCES Users(id) 
        ON DELETE SET NULL,
    CONSTRAINT private_messages_chk_chat_id CHECK (chat_id IS NOT NULL),
    CONSTRAINT private_messages_chk_sender_user_id CHECK (sender_user_id IS NOT NULL),
    -- CONSTRAINT private_messages_chk_timestamp CHECK (timestamp IS NOT NULL AND timestamp <= CURRENT_TIMESTAMP),
    CONSTRAINT private_messages_chk_content CHECK (content IS NOT NULL AND LENGTH(TRIM(content)) > 0 AND LENGTH(TRIM(content)) <= 500)
    -- CONSTRAINT private_messages_chk_created_at CHECK (created_at IS NOT NULL AND created_at < CURRENT_TIMESTAMP),
    -- CONSTRAINT private_messages_chk_updated_at CHECK (updated_at IS NOT NULL AND updated_at < CURRENT_TIMESTAMP),
    -- CONSTRAINT private_messages_chk_deleted_at CHECK (deleted_at IS NULL OR deleted_at < CURRENT_TIMESTAMP)
)
-- TODO: Add trigger to Updated_at
;