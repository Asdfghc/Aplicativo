-- 004-create-private-chat.sql
CREATE TABLE PrivateChats (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    sender_user_id INTEGER,
    receiver_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT private_chats_fk_sender_user_id FOREIGN KEY (sender_user_id) REFERENCES Users(id) 
        ON DELETE CASCADE,
    CONSTRAINT private_chats_fk_receiver_user_id FOREIGN KEY (receiver_user_id) REFERENCES Users(id)
        ON DELETE CASCADE,
    CONSTRAINT private_chats_chk_sender_user_id CHECK (sender_user_id IS NOT NULL),
    CONSTRAINT private_chats_chk_receiver_user_id CHECK (receiver_user_id IS NOT NULL),
    -- CONSTRAINT private_chats_chk_created_at CHECK (created_at IS NOT NULL AND created_at < CURRENT_TIMESTAMP),
    -- CONSTRAINT private_chats_chk_updated_at CHECK (updated_at IS NOT NULL AND updated_at < CURRENT_TIMESTAMP),
    -- CONSTRAINT private_chats_chk_deleted_at CHECK (deleted_at IS NULL OR deleted_at < CURRENT_TIMESTAMP), 
    CONSTRAINT private_chats_chk_automessage CHECK (sender_user_id <> receiver_user_id),
    CONSTRAINT private_chats_unq_duo_chat UNIQUE (sender_user_id, receiver_user_id)
)
-- TODO: Add trigger to Updated_at
;