const UserLog = require("../MODEL/user")

const bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken")





const generateAccessToken =(payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "5m"})
}


const generateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "5d"})
}


const user = {
    register: async (req, res) =>{
        try {
            const {email, password, confirm_password} = req.body

            if( !email || !password || !confirm_password)
            return res.status(400).json({msg: "Please enter all fields"})

            if(password !== confirm_password)
            return res.status(400).json({msg: "confirm password doesn't match"})

            const userExist = await UserLog.findOne({email: email})
            if(userExist) return res.status(400).json({msg: "This user already exist!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new UserLog({email, password: hashedPassword })

            const accessToken = generateAccessToken({newUser})

            const refreshToken = generateRefreshToken({newUser})

            await newUser.save()

           return res.status(201).json({status: "success", msg: "Account created!", newUser, accessToken, refreshToken})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    getAllUser: async (req, res) =>{
        try {
            const allusers = await UserLog.find()

            return res.status(200).json(allusers)
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
            
        }
    }
}

module.exports = user