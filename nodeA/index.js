const express = require("express")
const connectDB = require("./db")
const routes = require("./routes")
const dotenv = require("dotenv").config()

const app = express()

app.use(express.json())

connectDB()
app.use("/api", routes)

const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) =>{
    console.log(`server running on port ${PORT}`)
})

app.get("/", (req, res) =>{ 
    res.status(200).json({msg: "Welcome to Pjazz Backend*"})
})  