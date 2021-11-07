const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register 


router.post('/register' , async (req,res) => {

    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt);
        

        //create new user
        const newUser = await new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });
        

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }

    
});


//LOGIN

router.post("/login" , async(req , res) => {
    try
    { 
       const {email , password} = req.body
        const user = await User.findOne({email});
        
        if(user){
            const validPassword = await bcrypt.compare(password , user.password);
            if(validPassword){
                res.status(200).json(user)
            }else{
                res.status(400).send("Wrong password");
            }
        }else{
            res.status(404).send("User not found");
        }
        
        
        // !validPassword && 

        
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;