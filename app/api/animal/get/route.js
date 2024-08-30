import connectDB from "@/db/db";
import animalDB from "@/model/animalModel";
import { NextResponse } from "next/server";

// Get all Animal 
export const GET = async (req, res) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');

        //page convert  data
        const currentPage = parseInt(page);
        const limitPage = parseInt(limit);
        const skip = ((currentPage - 1) * limitPage);
        const totalCount = await animalDB.countDocuments();
        const totalPage = Math.ceil(totalCount / limit);







        let filter = {};
        if (category) {
            filter.category = category;
        }

        const product = await animalDB.find(filter).skip(skip).limit(limitPage);

        //success
        return NextResponse.json({
            totalPage,
            currentPage,
            product
        })


    } catch (error) {
        return NextResponse.json({
            message: 'Animal not found',
            error: error?.message,
            status: 404
        })
    }
}