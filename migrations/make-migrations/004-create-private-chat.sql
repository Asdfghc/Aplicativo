-- 004-create-private-chat.sql
CREATE TABLE Conversa (
    ID_Conversa NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
    ID_Usuario1 NUMBER,
    ID_Usuario2 NUMBER,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID_Conversa),
    CONSTRAINT FK_Usuario1_Conversa FOREIGN KEY (ID_Usuario1) REFERENCES Usuario(ID_Usuario) 
        ON DELETE CASCADE,
    CONSTRAINT FK_Usuario2_Conversa FOREIGN KEY (ID_Usuario2) REFERENCES Usuario(ID_Usuario)
        ON DELETE CASCADE,
    CHECK (ID_Usuario1 IS NOT NULL AND ID_Usuario1 > 0),
    CHECK (ID_Usuario2 IS NOT NULL AND ID_Usuario2 > 0),
    CHECK (ID_Usuario1 <> ID_Usuario2)
)
-- TODO: Add trigger to Updated_at
;