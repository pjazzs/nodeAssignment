const express = require("express")
const authUser = require("../Controllers/auth.Ctrl")

const router = express.Router()

router.post("/auth", authUser.postUser)
router.post("/auth", authUser.getOneUser)
router.post("/auth", authUser.getAllUsers)
router.post("/auth", authUser.updateUser)
router.post("/auth", authUser.deleteUser)

module.exports = router