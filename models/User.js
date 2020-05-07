const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Book = require('./Book');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password') || value.split('').length < 7)
                throw new Error('Choose another password!');
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter A valid Email!')
            }
        }
    }
} , {
    timestamps: true
});

userSchema.virtual('books' , {
    ref: 'Books',
    localField: '_id',
    foreignField: 'owner'
});

// userSchema.methods.generateAuthToken = async function () {
//     const user = this 
//     const token = jwt.sign({ _id: user._id.toString() } , config.get("JWT_SECRET"))

//     await user.save()

//     return token
// }

// userSchema.statics.findByCredentials = async (email , password) => {
//     const user = await User.findOne({ email })

//     if (!user){
//         throw new Error('Unable to login!')
//     }

//     const match = await bcrypt.compare(password , user.password)
    
    
//     if (!match){
//         throw new Error('Unable to login!')
//     }
//     return user
// }

userSchema.pre('remove' , async function (next) {
    const user = this
    await Book.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User' , userSchema);

module.exports = User;
