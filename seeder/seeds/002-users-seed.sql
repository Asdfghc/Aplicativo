-- 102-seed-users.sql

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('alice@example.com', '12345678901', 'Alice Johnson', '11912345678', TO_DATE('1995-05-15', 'YYYY-MM-DD'), 'FEMALE', '01234567', 'Rua das Flores', 100, 'Centro', 'BR', 'São Paulo', 'Bio da Alice', 'alice.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('bob@example.com', '23456789012', 'Bob Smith', '21987654321', TO_DATE('1992-10-20', 'YYYY-MM-DD'), 'MALE', '12345678', 'Avenida Brasil', 500, 'Zona Sul', 'BR', 'Rio de Janeiro', 'Bio do Bob', 'bob.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('charlie@example.com', '34567890123', 'Charlie Evans', '11999887766', TO_DATE('1988-12-01', 'YYYY-MM-DD'), 'MALE', '23456789', 'Rua Verde', 45, 'Bairro Novo', 'BR', 'Campinas', 'Bio do Charlie', 'charlie.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('david@example.com', '45678901234', 'David Wright', '21912348765', TO_DATE('1990-07-08', 'YYYY-MM-DD'), 'MALE', '34567890', 'Travessa Azul', 12, 'Bairro Antigo', 'BR', 'Niterói', 'Bio do David', 'david.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('eve@example.com', '56789012345', 'Eve Torres', '11911223344', TO_DATE('1998-03-25', 'YYYY-MM-DD'), 'FEMALE', '45678901', 'Alameda Santos', 87, 'Centro', 'BR', 'São Paulo', 'Bio da Eve', 'eve.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('frank@example.com', '67890123456', 'Frank Underwood', '21933445566', TO_DATE('1985-11-11', 'YYYY-MM-DD'), 'MALE', '56789012', 'Rua do Sol', 220, 'Cidade Alta', 'BR', 'Salvador', 'Bio do Frank', 'frank.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('grace@example.com', '78901234567', 'Grace Hopper', '11955667788', TO_DATE('1993-09-30', 'YYYY-MM-DD'), 'FEMALE', '67890123', 'Rua das Palmeiras', 14, 'Vila Nova', 'BR', 'Curitiba', 'Bio da Grace', 'grace.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('heidi@example.com', '89012345678', 'Heidi Klum', '21977889900', TO_DATE('1987-02-14', 'YYYY-MM-DD'), 'FEMALE', '78901234', 'Avenida Atlântica', 320, 'Copacabana', 'BR', 'Rio de Janeiro', 'Bio da Heidi', 'heidi.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('ivan@example.com', '90123456789', 'Ivan Drago', '11999887755', TO_DATE('1990-01-01', 'YYYY-MM-DD'), 'MALE', '89012345', 'Rua das Pedras', 65, 'Vila Velha', 'BR', 'Belo Horizonte', 'Bio do Ivan', 'ivan.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO Users (email, document_number, name, phone_number, date_of_birth, sex, zip_code, street_address, address_number, district, country_code, city, bio, profile_photo, created_at, updated_at, deleted_at)
VALUES ('judy@example.com', '01234567890', 'Judy Hopps', '21988776655', TO_DATE('1996-06-18', 'YYYY-MM-DD'), 'FEMALE', '90123456', 'Praça das Rosas', 29, 'Centro', 'BR', 'Porto Alegre', 'Bio da Judy', 'judy.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
