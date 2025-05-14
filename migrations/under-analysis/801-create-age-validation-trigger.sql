-- 801-create-age-validation-trigger.sql

CREATE OR REPLACE TRIGGER trg_validate_age
AFTER INSERT OR UPDATE ON users
FOR EACH ROW
BEGIN
    prc_validate_age(:NEW.date_of_birth);
END;