
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const RegUser = require("../MODEL/regUser")


const generateAccessToken =(payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "5m"})
}


const generateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "5d"})
}


const regUser ={
    reg: async (req, res) =>{
        try {
            const{email, password, confirm_password, firstName, lastName, address} = req.body

            const user = await RegUser.findOne({email: email})
            if(user) return res.status(400).json({msg: "This user already exist!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new RegUser({email, password: hashedPassword,  confirm_password, firstName, lastName, address})

            const accessToken = generateAccessToken({newUser})

            const refreshToken = generateRefreshToken({newUser})


           await newUser.save()
           return res.status(200).json({msg: "Registered succesfully", newUser, accessToken, refreshToken})


        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    login: async (req, res) =>{
        try {
            const {email, password}=req.body

            const login = await RegUser.findOne({email: email})

            if(!login)
            return res.status(400).json({msg: "No user with this email"})

            const passwordTally = await bcrypt.compare(password, login.password)
            if(!passwordTally) return res.status(400).json({msg: "password is incorrect"})

            const correct = await bcrypt.compare(password, login.password)
            if(correct) return res.status(200).json(login)
                
            } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = regUser