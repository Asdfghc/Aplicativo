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
                        `SELECT u.ID, u.EMAIL, u.NAME, a.HASHED_PWD
                         FROM Users u
                         JOIN Auth a ON u.AUTH_ID = a.ID
                         WHERE u.EMAIL = :email`,
                        { email } // bind nomeado
                    );

                    if (result.rows.length === 0) {
                        console.log("Email não encontrado.");
                        return done(null, false, {
                            message: "Invalid email or password",
                        });
                    }

                    const row = result.rows[0];

                    console.log("password: ", password);
                    console.log("user: ", row);
                    console.log("stored password: ", row.HASHED_PWD);

                    const isMatch = await bcrypt.compare(password, row.HASHED_PWD);

                    if (!isMatch) {
                        console.log("Senha incorreta.");
                        return done(null, false, {
                            message: "Invalid email or password",
                        });
                    }

                    // Usuário autenticado com sucesso
                    return done(null, {
                        id: row.ID,
                        email: row.EMAIL,
                        nome: row.NAME,
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
                    `SELECT ID, EMAIL, NAME FROM Users WHERE ID = :id`,
                    { id } // bind nomeado
                );

                if (result.rows.length === 0) return null;

                const row = result.rows[0];
                return {
                    id: row.ID,
                    email: row.EMAIL,
                    nome: row.NAME,
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
