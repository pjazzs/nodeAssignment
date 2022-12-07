const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const authReg = require("../MODEL/auth")


const generateAccessToken =(payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "5m"})
}


const generateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "5d"})
}

const authUser = {
    postUser: async (req, res) =>{
        try {
            const {name, password,  address, firstName, lastName  } = req.body

            const allusers = await authReg.findOne({email: email})

            if(allArticle) return res.status(400).json({msg: "user already exist"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new authReg({email, password: hashedPassword, name, address, firstName, lastName })

            const accessToken = generateAccessToken({newUser})

            const refreshToken = generateRefreshToken({newUser})

            await newUser.save()

            return res.status(200).json({msg: "User added successfully!",
            newUser,
            accessToken,
            refreshToken
        })

            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const allUser = await authReg.find()
   
            if(!allUser)
            return res.status(404).json({msg: "No user on the database"})
   
       res.status(200).json(allUser)
       } catch (error) {
           return res.status(500).json({msg: error.message})
           
       }
    },

    getOneUser: async (req, res) =>{
        try { 
           const {id} = req.params
   
           const user= await authReg.findById(id)
   
           if(!user)
           return res.status(200).json({msg: "this user does not exist!"})
   
           return res.status(200).json(user)
   
           // const id = req.params.id
           
       } catch (error) { 
           
           return res.status(500).json({msg: error.message})
       }
    },

    updateUser:  async (req, res) => {
        try {
            const {id} = req.params
    
            const {email, password: hashedPassword, name, address, firstName, lastName}= req.body
    
            const user = await authReg.findByIdAndUpdate(id, {email, password: hashedPassword, name, address, firstName, lastName})
    
            return res.status(200).json({msg: "user updated successfully"})
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
            
        
    }
    },

    deleteUser: async (req, res) => {
        
        try {
            const {id} = req.params
    
            const userToDelete = await authReg.findById(id)
    
            if(!userToDelete)
            return res.status(404).json({msg: "this user doesn't exist"})
    
            const deletedUser = await authReg.findByIdAndDelete(id)
            return res.status(200).json({msg: "user deleted successfuly"})
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
            
        }
},
}


module.exports = authUser