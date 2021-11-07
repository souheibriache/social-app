const mongoose = require('mongoose');


const messageShema = new mongoose.Schema({
    conversationId : {
        type:String,
    },
    sender:{
        type : String,
    },
    text:{
        type: String,
    }

},
{timestamps : true}
);
const Message = mongoose.model("Message" , messageShema)
module.exports = Message;