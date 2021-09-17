const Validator = require('fastest-validator')
const models = require('../models')

function save(req, res){
    const post ={ //postX
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id,
        userId: 1
    }

    const schema = {
        title: {type:"string", optional: false, max: "100"},
        content: {type:"string", optional: false, max: "500"},
        categoryId: {type:"number", optional: false}
    }

    const v = new Validator()
    const validResp = v.validate(post, schema)

    if(validResp!==true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validResp
        })
    }

    models.Post.create(post).then(result=>{ //postX
        res.status(201).json({
            message: "Post created successfully",
            post: result
        })
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
            post: error
        })
    })
}

function show(req, res){
    const id = req.params.id

    models.Post.findByPk(id).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "System can't found that post"
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "something went wrong"
        })
    })
}

function showAll(req, res){
    models.Post.findAll().then(result=>{
        res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json({
            message: "something went wrong"
        })
    })
}

function update(req, res){
    const id = req.params.id
    const toUpdatedPost = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.image_url,
        categoryId : req.body.category_id,
    }
    const userId = 1

    models.Post.update(toUpdatedPost, {where: {id:id, userId: userId}}).then(result=>{
        res.status(200).json({
            message: "Post updated successfully",
            post: toUpdatedPost
        })
    }).catch(error=>{
        res.status(500).json({
            message: "something went wrong",
            error: error
        })
    })
     //first id is column name, //filtering post records
}

function deleteR(req, res){
    const id = req.params.id
    const userId = 1
    
    models.Post.findOne({where:{id:id}}).then(result=>{
        if(result){
            models.Post.destroy({where: {id:id, userId: userId}}).then(result=>{
                res.status(200).json({
                    message: "Post deleted successfully",
                })
            }).catch(error=>{
                res.status(500).json({
                    message: "something went wrong",
                    error: error
                })
            })
        } else{
            res.status(404).json({
                message: "System can't found that post"
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message: "something went wrong"
        })
    })
   
}
module.exports = {
    save: save,
    show: show,
    showAll: showAll,
    update: update,
    deleteR: deleteR
}














































// function index(req, res){
//     res.send("Posts list")
// }


// module.exports = {
//     index: index
// }