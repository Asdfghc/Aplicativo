const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { withDb } = require("./db/db");

function initialize(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                console.log("body: ", req.body);

                try {
                    const result = await req.db.execute(
                        "SELECT * FROM Usuario WHERE Email = :email",
                        [email]
                    );

                    if (result.rows.length === 0) {
                        console.log("Email não encontrado.");
                        return done(null, false, {
                            message: "Invalid email or password",
                        });
                    }

                    const user = result.rows[0];

                    console.log("password: ", password);
                    console.log("user: ", user);
                    console.log("stored password: ", user[4]); // Supondo que user[4] seja a senha

                    const isMatch = await bcrypt.compare(password, user[4]);

                    if (!isMatch) {
                        console.log("Senha incorreta.");
                        return done(null, false, {
                            message: "Invalid email or password",
                        });
                    }

                    // Retorne um objeto de usuário com os campos desejados
                    return done(null, {
                        id: user[0], // Suponha que seja o ID
                        email: user[1], // Suponha que seja o Email
                        nome: user[3], // Exemplo: Nome do usuário
                    });
                } catch (err) {
                    console.error("Erro durante login:", err);
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await withDb(async (connection) => {
                const result = await connection.execute(
                    `SELECT * FROM Usuario WHERE ID_Usuario = :id`,
                    [id]
                );

                if (result.rows.length === 0) {
                    return null;
                }

                const row = result.rows[0];
                return {
                    id: row[0], // ID
                    email: row[1], // Email
                    nome: row[3], // Nome
                    // Adicione mais campos se quiser
                };
            });

            if (!user) return done(null, false);
            return done(null, user);
        } catch (err) {
            console.error("Erro no deserializeUser:", err);
            return done(err);
        }
    });
}

module.exports = initialize;
