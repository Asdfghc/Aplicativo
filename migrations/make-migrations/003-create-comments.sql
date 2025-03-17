-- 003-create-comments.sql
CREATE TABLE Comentarios (
    ID NUMBER PRIMARY KEY,
    Conteudo VARCHAR2(500),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Postagem_ID NUMBER,
    Usuario_ID NUMBER,
    FOREIGN KEY (Postagem_ID) REFERENCES Postagem(ID),
    FOREIGN KEY (Usuario_ID) REFERENCES Usuario(ID)
)