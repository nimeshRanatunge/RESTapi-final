const models = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { DataTypes } = require("sequelize");

function signUp(req, res){

    models.User.findOne({where:{email:req.body.email}}).then(result=>{
        if(result){
            res.status(409).json({
                message: "Email already exists",
            })
        }else{
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
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
    }).catch(err=>{
        res.status(500).json({
            message: "Something went wrong",
        })
    })

}

function login(req, res){
    models.User.findOne({where:{email:req.body.email}}).then(user=>{ //user obj
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials",
            })
        }else{
            bcrypt.compare(req.body.password, user.password, (err, result)=>{   //user obj
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', (err, token)=>{
                        res.status(200).json({
                            message: "Athentication successfull",
                            token: token
                        })
                    })
                }else{
                    res.status(401).json({
                        message: "Invalid credentials",
                    })
                }
            }) 
        }
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
        })
    })
}

module.exports = {
    signUp: signUp,
    login: login
}