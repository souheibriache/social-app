const router = require("express").Router();
const Message = require('../models/Message');


//added
router.post('/', async (req , res)=> {
    const newMessage = new Message(req.body);
    
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
    try{

    }catch(err){
        res.status(500).json(err)
    }
})


//get

router.get('/:conversationId' , async(req , res)=>{
    try{
        const allMessages = await Message.find({
            conversationId : req.params.conversationId,
        });
        res.status(200).json(allMessages);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router ;