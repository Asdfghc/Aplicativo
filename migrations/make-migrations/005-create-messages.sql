-- 005-create-messages.sql
CREATE TABLE Mensagem (
    ID NUMBER PRIMARY KEY,
    Conteudo VARCHAR2(500),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Conversa_privada_ID NUMBER,
    Usuario_envio_ID NUMBER,
    FOREIGN KEY (Conversa_privada_ID) REFERENCES Conversa_privada(ID),
    FOREIGN KEY (Usuario_envio_ID) REFERENCES Usuario(ID)
)