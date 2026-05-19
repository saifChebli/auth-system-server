// Schema (Core concept)
// => A schema defines the structure of our documents

import mongoose from "mongoose";

// Without Validation

// const userSchema = new mongoose.Schema({
//     name : String,
//     age : Number,
//     email : String
// })

// With Validation

// Missing name ---> error
// Age < 18 ---> error
// Duplicate email ---> error

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
    },
    age : {
        type : Number,
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    isActive : {
        type : Boolean,
        default : true
    }
} , { timestamps : true})


// Model : wrapper around the schema used to interact with MongoDB

export const User = mongoose.model('User' , userSchema)

// 1st Param : 'User' ----> collection name (users)