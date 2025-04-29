-- 701-create-age-validation-procedure.sql

CREATE OR REPLACE PROCEDURE prc_validate_age(date_of_birth IN DATE)
DECLARE
  age NUMBER;
BEGIN
  age := TRUNC(MONTHS_BETWEEN(SYSDATE, date_of_birth) / 12);

  IF v_age < AppConstants.c_minimal_age THEN
    RAISE_APPLICATION_ERROR(-20001, 'User are too young to use the app.')

END;
