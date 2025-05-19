const express = require("express");
const router = express.Router();
const { DateTime } = require('luxon');
const multer = require("multer");
const path = require("path");

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Pasta para armazenar as imagens
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Extensão do arquivo
        cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Nome único para o arquivo
    }
});

const upload = multer({ storage: storage });

// GET - Renderiza a página para criar a postagem
router.get("/create", checkAuthenticated, async (req, res) => {
    res.render("posts/create", { layout: "layouts/basic" });
});

// POST - Criação da postagem
router.post("/create", checkAuthenticated, upload.single("image"), async (req, res) => {
    let { title, description, lostOrFound, lastSeen, dateLost } = req.body;

    if (!title || !description || !lastSeen || !dateLost) {
        req.flash("error", "Preencha todos os campos.");
        return res.redirect("/posts/create");
    }

    if (!lostOrFound) {
        lostOrFound = 0;
    }

    if (!req.file) {
        req.flash("error", "Imagem é obrigatória.");
        return res.redirect("/posts/create");
    }

    // Converter a data para o formato DateTime do JavaScript
    const date = DateTime.fromISO(dateLost);

    if (!date.isValid) {
        req.flash("error", "Data inválida.");
        return res.redirect("/posts/create");
    }

    // Upload de imagem
    const imageName = req.file ? req.file.filename : null;

    try {
        // Inserção no banco de dados
        await req.db.execute(
            "INSERT INTO Posts (title, image, description, lost_or_found, last_known_location, last_seen, user_id) VALUES (:title, :image, :description, :lostOrFound, :lastSeen, :dateLost, :userId)",
            {
                title: title,
                image: imageName,
                description: description,
                lostOrFound: lostOrFound,
                lastSeen: lastSeen,
                dateLost: date.toJSDate(),  // Passando a data no formato correto para o Oracle
                userId: req.user.id
            }
        );
        await req.db.commit();
        req.flash("success", "Postagem criada com sucesso.");
        res.redirect("/posts/create");
    } catch (err) {
        console.error("Erro ao criar postagem:", err);
        req.flash("error", "Erro ao criar postagem: " + err.message);
        res.redirect("/posts/create");
    }
});

// Middleware para verificar se o usuário está autenticado
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário autenticado, prossiga para a próxima função
    }
    req.flash("error", "Você precisa estar logado para acessar esta página.");
    res.redirect("/users/login"); // Redireciona para a página de login se não estiver autenticado
}

module.exports = router;