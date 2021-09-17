const models = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function signUp(req, res){

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(req.body.password, salt, (err, hash)=>{
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        
            models.User.create(user).then(result=>{
                res.status(201).json({
                    message: "User signed successfully",
                })
            }).catch(error=>{
                res.status(500).json({
                    message: "Something went wrong",
                })
            })
        })
    })

    
    
}

module.exports = {
    signUp: signUp
}