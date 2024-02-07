const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    email: {
        unique: true,
        type: String,
        require: [true, "Name is required"]
    },

    // Income: {
    //     unique: true,
    //     type: Number,
    //     require: [true, "Name is required"]
    // },
    password: {
        type: String,
        require: [true, "Name is required"]
    },
    createAt: {
        type:Date,
        default:Date.now,
    },

})

module.exports = mongoose.model("users", UsersSchema)