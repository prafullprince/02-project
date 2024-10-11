import { dbConnect } from "@/config/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

dbConnect();


export async function POST(request:NextRequest){
    try {
        // fetch data
        const reqBody = await request.json();
        const {firstName,lastName,email,password} = reqBody;
        console.log("reqBody",reqBody);

        // validation
        if(!firstName || !lastName || !email || !password){
            return NextResponse.json({message:"please fill all the details"},{status:400});
        }

        // check userAlreadyExist
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message:"user already exists"},{status:400});
        }

        // hash password
        const hashedPassword = await bcryptjs.hash(password,10);

        // save user entry in db
        const newUser = new User({firstName,lastName,email,password:hashedPassword});
        const data = await newUser.save();

        // return res
        return NextResponse.json({message:"User created",success:true,data},{status:201});



    } catch (error:unknown) {
        console.log(error);
        return NextResponse.json({error:error,success:false},{status:500});
    }
}
