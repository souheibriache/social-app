const router = require("express").Router();
const Post = require('../models/Post');
const User = require('../models/User');
//Create a post
router.post('/' , async (req , res) => {
    const newPost = new Post(req.body);
    try{
        const savepost = await newPost.save();
        res.status(200).json(savepost);
    }catch(err){
        res.status(500).json(err)
    }
})



//update a post
router.put('/:id' , async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
        try{

            await post.updateOne({$set:req.body});
            res.status(200).json("Post has been updated");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can update only your posts");
    }
})


//deleete a post
router.delete('/:id' , async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
        try{

            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can deleete only your posts");
    }
})


//like a post
router.put('/:id/like',  async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes : req.body.userId}});
            res.status(200).json("Post has been liked")
        }else{
            await post.updateOne({$pull: {likes : req.body.userId}});
            res.status(200).json("Post has been disliked")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//get a post
router.get('/:id' , async(req,res)=> {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)

    }catch(err){
        res.status(500).json(err)
    }
})


//get timeline posts 
router.get('/timeline/:userId' , async (req , res)=> {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currentUser._id});
        const friendsPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({userId : friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendsPosts));
    }catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
})

//get user's all posts 
router.get('/profile/:username' , async (req , res)=> {
    try{
        const user = await User.findOne({username : req.params.username});
        const posts = await Post.find({userId : user._id});
        res.status(200).json(posts)
    }catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router ;