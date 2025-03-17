-- 002-create-posts.sql
CREATE TABLE Postagem (
    ID NUMBER PRIMARY KEY,
    Conteudo VARCHAR2(500),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Descricao_animal VARCHAR2(255),
    Achado_ou_perdido VARCHAR2(10),
    Informacoes_extras VARCHAR2(255),
    Ultimo_local_visto VARCHAR2(255),
    Data_quando_perdeu DATE,
    Usuario_ID NUMBER,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuario(ID)
)