const mongoose = require('mongoose');
const UsersModel = require('./UserSchema')

const TranctionsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"],
        trim:true,
    },
    amount: {
       
        type: Number,
        require: [true, "amount is required"],
        default:0,
    },

    category: {
  
        type: String,
        require: [true, "Category is required"]
    },
    description: {
        type: String,
        require: [true, "description is required"]
    },
    tranctionType: {
        type: String,
        require: [true, "tranctionType is required"]
    },
    date:{
        type:Date,
        require: [true, "date is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: UsersModel,
        require: [true, "date is required"]
    },
    createAt: {
        type:Date,
        default:Date.now,
    },

})

module.exports = mongoose.model("Tranctions", TranctionsSchema)