import mongoose from "mongoose";


export async function dbConnect(){
    try {
        mongoose.connect(process.env.DATABASE_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("mongodb is connected");
        });

        connection.on('error',(error)=>{
            console.log(error);
            process.exit();
        })
    } catch (error) {
        console.log(error);            
    }
}
