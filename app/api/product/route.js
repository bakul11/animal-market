import connectDB from "@/db/db";
import animalDB from "@/model/animalModel";
import { NextResponse } from "next/server"

// Post Animal 
export const GET = async (req, res) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');
        const pd = await animalDB.find({ title: { $regex: search, $options: 'i' } })


        //success 
        return NextResponse.json(pd)
    } catch (error) {
        return NextResponse.json({
            message: 'Product not found !',
            error: error?.message,
            status: 404
        })
    }
}


