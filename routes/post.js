const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/home',requireLogin, (req, res)=>{    
    Post.find()
    .populate("postedBy", "name _id")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/ask',requireLogin, (req, res)=>{
    const {title, body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Please Add all details"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})

    })
    .catch(error=>{
        console.log(error)
    })
    
})


module.exports = router