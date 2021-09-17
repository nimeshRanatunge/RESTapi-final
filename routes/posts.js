//ROUTE

const express = require('express')

const postsController = require('../controllers/post.controller')

const router = express.Router()

router.post("/", postsController.save)
router.get("/", postsController.showAll)
router.get("/:id", postsController.show) //define id by :
router.patch("/:id", postsController.update)
router.delete("/:id", postsController.deleteR)

module.exports = router


// app.get('/', (req, res)=>{
//     res.send("Hello world")
// }) //endpoints


