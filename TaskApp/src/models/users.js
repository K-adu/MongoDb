const mongoose = require('mongoose')
const validator = require('validator')

const User =  mongoose.model('User', {
    name: {
        type: String,
        required: true


    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("please enter a valid email address")
            }

        },
       
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        // validate(value){
        //     if(value.toLowerCase().includes('password')){
        //         throw new Error("Passoword cannot contain 'password'")
        //     }
        // }
    },
    age: {
        type: Number,
        default: 0,
        required: true,
        validate(value){
            if(value<0){
                throw new Error('Age must be a postive number')
            }
        }
    },
})

module.exports = User