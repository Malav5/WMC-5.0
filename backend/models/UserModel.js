const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
    },
    
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['member','admin'],
        default:'member'
    }
},
{timestamps:true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports=User;
