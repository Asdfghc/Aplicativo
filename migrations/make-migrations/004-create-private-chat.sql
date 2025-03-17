-- 004-create-private-chat.sql
CREATE TABLE Conversa_privada (
    ID NUMBER PRIMARY KEY,
    Usuario1_ID NUMBER,
    Usuario2_ID NUMBER,
    FOREIGN KEY (Usuario1_ID) REFERENCES Usuario(ID),
    FOREIGN KEY (Usuario2_ID) REFERENCES Usuario(ID)
)