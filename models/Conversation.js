const mongoose = require('mongoose');


const conversationShema = new mongoose.Schema({
    members: {
        type : Array
    }
},
{timestamps : true}
);
const Conversation = mongoose.model("Conversation" , conversationShema)
module.exports = Conversation;