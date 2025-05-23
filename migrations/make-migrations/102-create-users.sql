-- 102-create-users.sql
CREATE TABLE Users (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    auth_id INTEGER,
    email VARCHAR2(254),
    document_number VARCHAR2(20),
    name VARCHAR2(100),
    phone_number VARCHAR2(15),
    date_of_birth DATE,
    sex VARCHAR2(6), -- SexType,
    zip_code VARCHAR2(10),
    street_address VARCHAR2(100),
    address_number INTEGER,
    district VARCHAR2(100),
    country_code CHAR(2),
    city VARCHAR2(100),
    bio CLOB, -- TODO: passar para table profile
    profile_photo VARCHAR2(255), -- TODO: passar para table profile
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    CONSTRAINT users_pk PRIMARY KEY (id),
    CONSTRAINT users_fk_auth_id FOREIGN KEY (auth_id) REFERENCES Auth (id) ON DELETE CASCADE,
    CONSTRAINT users_chk_auth_id CHECK (auth_id IS NOT NULL),
    CONSTRAINT users_chk_email CHECK (email IS NOT NULL AND REGEXP_LIKE(email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})*$')),
    CONSTRAINT users_chk_document_number CHECK (document_number IS NOT NULL AND REGEXP_LIKE(document_number, '^[0-9]+$')),
    CONSTRAINT users_chk_name CHECK (name IS NOT NULL AND LENGTH(TRIM(name)) > 0),
    CONSTRAINT users_chk_phone_number CHECK (phone_number IS NULL OR REGEXP_LIKE(phone_number, '^[0-9]+$')),
    -- CONSTRAINT users_chk_date_of_birth CHECK (date_of_birth IS NOT NULL),
    CONSTRAINT users_chk_sex CHECK (sex IS NULL OR LENGTH(TRIM(sex)) > 0),
    CONSTRAINT users_chk_zip_code CHECK (zip_code IS NULL OR REGEXP_LIKE(zip_code, '^[0-9]+$')),
    CONSTRAINT users_chk_address_number CHECK (address_number IS NULL OR address_number >= 0),
-- CONSTRAINT users_chk_created_at CHECK (updated_at IS NOT NULL AND updated_at <= CURRENT_TIMESTAMP)
-- CONSTRAINT users_chk_updated_at CHECK (created_at IS NOT NULL AND created_at <= CURRENT_TIMESTAMP)
-- CONSTRAINT users_chk_deleted_at CHECK (deleted_at IS NULL OR deleted_at <= CURRENT_TIMESTAMP)
    CONSTRAINT users_unq_email UNIQUE (email),
    CONSTRAINT users_unq_national_document_number UNIQUE (document_number, country_code),
    -- CONSTRAINT users_chk_document_dependency CHECK (
    --     (document_number IS NULL) OR
    --     (document_number IS NOT NULL AND country_code IS NOT NULL)
    -- ),
    CONSTRAINT users_unq_phone_number UNIQUE (phone_number)
)

-- TODO: triggers que verificam informações específicas de países, como zip_code, phone_number, etc
-- TODO: indexes
-- TODO: ON UPDATE CASCADE com triggers

;