import connectDB from "@/db/db";
import animalDB from "@/model/animalModel";
import { NextResponse } from "next/server"

// Post Animal 
export const POST = async (req, res) => {
    try {
        await connectDB();
        const body = await req.json();
        const animal = await animalDB.create(body);

        //success 
        return NextResponse.json({
            message: 'Animal add successfully !',
            success: true,
            status: 201,
            animal
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Animal add fail..',
            error: error?.message,
            status: 500
        })
    }
}


