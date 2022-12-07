const express = require("express")
const user = require("../Controllers/userCtrl")



const router = express.Router()

router.post("/register", user.register)

router.get("/users", user.getAllUser)


module.exports = router