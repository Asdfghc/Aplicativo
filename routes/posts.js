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

router.get("/", async (req, res) => {
    try {
        // Consulta para obter todas as postagens
        const posts = await req.db.execute("SELECT * FROM Posts");
        res.render("index", { posts: posts.rows, layout: "layouts/layout-posts"});
    } catch (err) {
        console.error("Erro ao buscar postagens:", err);
        req.flash("error", "Erro ao buscar postagens: " + err.message);
        res.redirect("/");
    }
});

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
        res.redirect("/"); 
    } catch (err) {
        console.error("Erro ao criar postagem:", err);
        req.flash("error", "Erro ao criar postagem: " + err.message);
        res.redirect("/posts/create");
    }
});


router.get("/search", async (req, res) => {
    const query = req.query.q;
    console.log("Query de busca:", query);
    if (!query) return res.redirect("/posts");

    try {
        const result = await req.db.execute(
            `SELECT
                id,
                user_id,
                timestamp,
                title,
                image,
                description,
                last_known_location,
                last_seen,
                created_at,
                updated_at,
                deleted_at,
                CASE
                    WHEN LOWER(title) LIKE '%' || LOWER(:query) || '%' THEN 3
                    WHEN LOWER(description) LIKE '%' || LOWER(:query) || '%' THEN 2
                    WHEN LOWER(last_known_location) LIKE '%' || LOWER(:query) || '%' THEN 1
                    ELSE 0
                END AS relevance
            FROM Posts
            WHERE LOWER(title) LIKE '%' || LOWER(:query) || '%'
                OR LOWER(description) LIKE '%' || LOWER(:query) || '%'
                OR LOWER(last_known_location) LIKE '%' || LOWER(:query) || '%'
            ORDER BY relevance DESC, created_at DESC`,
            { query: query }
        );


        const posts = result.rows;
        res.render("index", { posts, searchQuery: query , layout: "layouts/layout-posts"}); // ou outra view que você use
    } catch (err) {
        console.error("Erro na busca:", err);
        res.status(500).send("Erro ao buscar posts");
    }
});

router.get("/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        // Consulta para obter a postagem específica
        const post = await req.db.execute("SELECT * FROM Posts WHERE id = :postId", [postId]);
        if (post.rows.length === 0) {
            req.flash("error", "Postagem não encontrada.");
            return res.redirect("/");
        }
        const comments = await req.db.execute(
            `SELECT c.id, c.content, c.timestamp, u.name AS user_name
            FROM Comments c
            JOIN Users u ON c.user_id = u.id
            WHERE c.post_id = :postId
            ORDER BY c.timestamp DESC`,
            [postId]
        );

        res.render("posts/post", { post: post.rows[0], comments: comments.rows });
    } catch (err) {
        console.error("Erro ao buscar postagem:", err);
        req.flash("error", "Erro ao buscar postagem: " + err.message);
        res.redirect("/");
    }
});

router.post("/:id", checkAuthenticated, async (req, res) => {
    const postId = req.params.id;
    const { comment } = req.body;

    if (!comment) {
        req.flash("error", "Comentário não pode ser vazio.");
        return res.redirect(`/posts/${postId}`);
    }

    try {
        // Inserção do comentário no banco de dados
        await req.db.execute(
            "INSERT INTO Comments (POST_ID, USER_ID, CONTENT) VALUES (:postId, :userId, :content)",
            {
                postId: postId,
                userId: req.user.id,
                content: comment
            }
        );
        await req.db.commit();
        req.flash("success", "Comentário adicionado com sucesso.");
        res.redirect(`/posts/${postId}`);
    } catch (err) {
        console.error("Erro ao adicionar comentário:", err);
        req.flash("error", "Erro ao adicionar comentário: " + err.message);
        res.redirect(`/posts/${postId}`);
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