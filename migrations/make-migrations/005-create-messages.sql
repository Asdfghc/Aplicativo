-- 005-create-messages.sql
CREATE TABLE Mensagem (
    ID_Mensagem NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Conteudo VARCHAR2(500),
    ID_Conversa NUMBER,
    ID_Usuario NUMBER,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID_Mensagem),
    CONSTRAINT FK_Conversa_Mensagem FOREIGN KEY (ID_Conversa) REFERENCES Conversa(ID_Conversa) 
        ON DELETE CASCADE,
    CONSTRAINT FK_Usuario_Mensagem FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario) 
        ON DELETE CASCADE
)