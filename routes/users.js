const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/new", async (req, res) => {
    res.render("users/new", { layout: "layouts/basic" });
});

router.get("/login", async (req, res) => {
    res.render("users/login", { layout: "layouts/basic" });
});

router.get("/", async (req, res) => {
    try {
        const result = await req.db.execute("SELECT * FROM Usuario");
        console.log("result: ", result);
        res.render("index", { message: result.rows, layout: "layouts/basic" });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});

router.post("/new", async (req, res) => {
    let { name, email, CPF, password } = req.body;
    console.log("body: ", req.body);
    CPF = CPF.replace(/\D/g, ""); // Remove non-numeric characters from CPF
    password = await bcrypt.hash(password, 10);
    try {
        await req.db.execute(
            "INSERT INTO Usuario (Email, CPF, Nome, Senha) VALUES (:email, :CPF, :name, :password)",
            [email, CPF, name, password]
        );

        await req.db.commit();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log("body: ", req.body);
    try {
        const result = await req.db.execute(
            "SELECT * FROM Usuario WHERE Email = :email",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        console.log("password: ", password);
        const user = result.rows[0];
        console.log("user: ", user);
        console.log("stored password: ", user[4]);
        const isMatch = await bcrypt.compare(password, user[4]);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        //req.session.userId = user.ID; // Store user ID in session
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

/*
// Teste de rotas
router
    .route("/:id")
    .get(async (req, res) => {
        console.log(req.user);
        res.send("usuario " + req.params.id);
    })
    .put(async (req, res) => {
        res.send("usuario " + req.params.id + " atualizado");
    })
    .delete(async (req, res) => {
        res.send("usuario " + req.params.id + " deletado");
    });
*/

module.exports = router;
