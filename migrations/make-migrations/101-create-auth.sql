-- 101-create-auth.sql

CREATE TABLE Auth (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(254),
    hashed_pwd VARCHAR(255),
    role VARCHAR(20), -- RoleType,
    status VARCHAR(20), -- AccountStatusType,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    CONSTRAINT auth_pk PRIMARY KEY (id),
    CONSTRAINT auth_chk_username CHECK (username IS NOT NULL AND REGEXP_LIKE(username, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})*$')),
    CONSTRAINT auth_chk_pwd CHECK (hashed_pwd IS NOT NULL AND LENGTH(TRIM(hashed_pwd)) > 0),
    CONSTRAINT auth_chk_role CHECK (role IS NOT NULL AND LENGTH(TRIM(role)) > 0),
    CONSTRAINT auth_chk_status CHECK (status IS NOT NULL AND LENGTH(TRIM(status)) > 0),
    -- CONSTRAINT auth_chk_last_login CHECK (last_login IS NULL OR last_login <= CURRENT_TIMESTAMP),
    -- CONSTRAINT auth_chk_created_at CHECK (updated_at IS NOT NULL AND updated_at <= CURRENT_TIMESTAMP),
    -- CONSTRAINT auth_chk_updated_at CHECK (created_at IS NOT NULL AND created_at <= CURRENT_TIMESTAMP),
    -- CONSTRAINT auth_chk_deleted_at CHECK (deleted_at IS NULL OR deleted_at <= CURRENT_TIMESTAMP),
    CONSTRAINT auth_unq_username UNIQUE (username)
)

-- TODO: adicionar registro de ips de acesso, logs para auditoria e tabela de aceite de termos