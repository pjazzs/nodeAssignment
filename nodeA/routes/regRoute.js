const express = require("express")
const regUser = require("../Controllers/regUserCtrl")


const router = express.Router()


router.post("/reg", regUser.reg)

router.post("/login", regUser.login)


module.exports = router