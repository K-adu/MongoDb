const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true


    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
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
    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }]
},)

// generating auth token using jwt
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token =  jwt.sign({_id: user._id.toString()}, 'thisisebcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token


}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("the password mismatched or smth went wrond")
    }
    return user

}


//hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this

    console.log('this is before saving')
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)

    }

    next()
})

const User =  mongoose.model('User',userSchema)

module.exports = User