require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const http = require("http");
const { Server } = require("socket.io");

const { initializeDb, withDb, getConnection } = require("./db/db");
const { initializeAdminUser } = require("./db/initDb");
const { runMigrations } = require("./migrations/migration-runner");
const dbMiddleware = require("./db/dbMiddleware");
const waitForOracleDB = require("./db/waitForDb");
const initializePassport = require("./passport-config");

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layouts/layout", "layout/basic");

// Session, passport and flash must be initialized inside async setup
async function initialize() {
    try {
        await waitForOracleDB();
        await initializeAdminUser();
        await initializeDb();
        await runMigrations();

        app.use(
            session({
                secret: "segredo",
                resave: false,
                saveUninitialized: false
            })
        ); // TODO: Mudar o segredo

        initializePassport(passport);
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

        // Middleware para conexão por requisição
        app.use(dbMiddleware);

        // Rotas
        const userRouter = require("./routes/users");
        const chatRouter = require("./routes/chat");
        const postRouter = require("./routes/posts");
        app.use("/users", userRouter);
        app.use("/chat", chatRouter);
        app.use("/posts", postRouter);

        app.get("/", (req, res) => {
            res.render("index", { message: "PAGINA PRINCIPAL!" });
        });

        // Socket.io
        io.on("connection", (socket) => {
            console.log("Novo socket:", socket.id);

            socket.on("joinRoom", (roomId) => {
                socket.join(roomId);
                console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
            });

            socket.on("chatMessage", ({ roomId, senderId, message }) => {
                io.to(roomId).emit("chatMessage", {
                    senderId,
                    message,
                    timestamp: new Date().toISOString(),
                });

                try {
                    withDb(async (connection) => {
                        await connection.execute(
                            `INSERT INTO Mensagem (Conteudo, ID_Conversa, ID_Usuario)
               VALUES (:message, :roomId, :senderId)`,
                            [message, roomId, senderId]
                        );
                        await connection.commit();
                    });
                } catch (error) {
                    console.error("Error saving message:", error);
                }
            });

            socket.on("disconnect", () => {
                console.log("Socket desconectado:", socket.id);
            });
        });

        server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

initialize();
