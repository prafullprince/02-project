import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/config/database";

dbConnect();

export async function POST(request:NextRequest){
    try {
        // fetch data
        const reqBody = await request.json();
        const {email,password} = reqBody;

        // validation
        if(!email || !password){
            return NextResponse.json({success:false,message:"Please fill all the details"},{status:400});
        }

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({success:false,message:"Please signup to continue"},{status:400});
        }

        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({success:false,message:"Please enter validPassword"},{status:400});
        }

        // make token
        const payload = {
            id:user._id,
            email:user.email
        };

        const token = await jwt.sign(payload,process.env.SECRET_KEY!,{expiresIn:"1h"});

        // send token in cookies response
        user.token = token;
        const response = NextResponse.json({success:true,message:"User loggedIn",user},{status:200});
        response.cookies.set("token",token,{httpOnly:true});

        return response;
        
        
    } catch (error:unknown) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"internal server error"
        },{status:500});
    }
}
