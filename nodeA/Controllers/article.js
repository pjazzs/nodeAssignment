const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const Article = require("../MODEL/article")


const generateAccessToken =(payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "5m"})
}


const generateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "5d"})
}

const article = {
    postArticle: async (req, res) =>{
        try {
            const {articleName, subjectOfArticle, author, authorQualification, addressOfAuthor} = req.body

            const allArticle = await Article.findOne({articleName})

            if(allArticle) return res.status(400).json({msg: "article already exist"})

            const newArticle = new Article({articleName, subjectOfArticle, author, authorQualification, addressOfAuthor} )

            await newArticle.save()

            return res.status(200).json({msg: "Article added successfully!"})

            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    getAllArticle: async (req, res) => {
        try {
            const allArticle = await Article.find()
   
            if(!allArticle)
            return res.status(404).json({msg: "No article on the database"})
   
       res.status(200).json(allArticle)
       } catch (error) {
           return res.status(500).json({msg: error.message})
           
       }
    },

    getOneArticle: async (req, res) =>{
        try { 
           const {id} = req.params
   
           const article = await Article.findById(id)
   
           if(!article)
           return res.status(200).json({msg: "this article does not exist!"})
   
           return res.status(200).json(article)
   
           // const id = req.params.id
           
       } catch (error) { 
           
           return res.status(500).json({msg: error.message})
       }
    },

    updateArticle:  async (req, res) => {
        try {
            const {id} = req.params
    
            const {articleName, subjectOfArticle, author, authorQualification, addressOfAuthor}= req.body
    
            const article = await Article.findByIdAndUpdate(id, {articleName, subjectOfArticle, author, authorQualification, addressOfAuthor})
    
            return res.status(200).json({msg: "article updated successfully"})
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
            
        
    }
    },

    deleteArticle: async (req, res) => {
        
        try {
            const {id} = req.params
    
            const articleToDelete = await Article.findById(id)
    
            if(!articleToDelete)
            return res.status(404).json({msg: "this article doesn't exist"})
    
            const deletedarticle = await Article.findByIdAndDelete(id)
            return res.status(200).json({msg: "article deleted successfuly"})
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
            
        }
},
}


module.exports = article