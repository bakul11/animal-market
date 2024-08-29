import connectDB from "@/db/db";
import animalDB from "@/model/animalModel";
import { NextResponse } from "next/server";

// Get all Animal 
export const GET = async (req, res) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        
        let filter = {};
        if (category) {
            filter.category = category;
        }

        const pd = await animalDB.find(filter);

        //success
        return NextResponse.json(pd)


    } catch (error) {
        return NextResponse.json({
            message: 'Animal not found',
            error: error?.message,
            status: 404
        })
    }
}