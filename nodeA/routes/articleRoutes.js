const express = require("express")
const article = require("../Controllers/article")

const router = express.Router()


router.post("/article", article.postArticle)

router.get("/articless", article.getAllArticle)

router.get("/articles", article.getOneArticle)

router.get("/update", article.updateArticle)

router.get("/delete", article.deleteArticle)


module.exports = router
