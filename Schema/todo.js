// Databse structure definition in Schema folder

const mongoose = require('mongoose');

const todoschema = new mongoose.Schema({
    Title: {
        type:String,
        required: true,
        trim : true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    Description :{
        type:String,
        required : false,
        trim : true,
        default : ""
    },
    Completed :{
        type:Boolean,
        default:false,
    }
}, {
    timestamps :{createdAt :true , updatedAt: false }
});

module.exports = mongoose.model('Todo', todoschema);
