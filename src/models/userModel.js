import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    token:String,
    resetPasswordToken:String,
    resetPasswordTokenExpiry:Date,
    tokenExpiry:Date
});

// export
const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;
