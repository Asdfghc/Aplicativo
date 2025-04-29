-- 103-create-posts.sql
CREATE TABLE Posts (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description CLOB, -- TODO: Tipos de animal
    known_or_lost VARCHAR(5), -- KnownOrLostType,
    last_known_location VARCHAR2(255), -- TODO: Localizacao
    last_seen DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT posts_fk_user_id FOREIGN KEY (user_id) REFERENCES Users(id)
        ON DELETE CASCADE,
    CONSTRAINT posts_chk_user_id CHECK (id IS NOT NULL), -- id não pode ser nulo
    -- CONSTRAINT posts_chk_timestamp CHECK (timestamp IS NOT NULL AND timestamp <= CURRENT_TIMESTAMP),
    CONSTRAINT posts_chk_description CHECK (description IS NOT NULL AND LENGTH(description) > 0), -- Descrição não pode ser vazia
    CONSTRAINT posts_chk_known_or_lost CHECK (known_or_lost IS NOT NULL AND LENGTH(known_or_lost) > 0), -- Achado ou perdido deve ser 0 ou 1
    CONSTRAINT posts_chk_last_known_location CHECK (last_known_location IS NOT NULL AND LENGTH(last_known_location) > 0) -- Último local visto não pode ser vazio
    -- CONSTRAINT posts_chk_last_seen CHECK (last_seen IS NOT NULL AND last_seen < CURRENT_TIMESTAMP), -- Data quando perdeu não pode ser nula
    -- CONSTRAINT posts_chk_created_at CHECK (updated_at IS NOT NULL AND updated_at <= CURRENT_TIMESTAMP),
    -- CONSTRAINT posts_chk_updated_at CHECK (created_at IS NOT NULL AND created_at <= CURRENT_TIMESTAMP),
    -- CONSTRAINT posts_chk_deleted_at CHECK (deleted_at IS NULL OR deleted_at <= CURRENT_TIMESTAMP),
)
-- TODO: Add trigger to Updated_at
;