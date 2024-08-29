import connectDB from "@/db/db";
import categoryDB from "@/model/categoryModel";
import { NextResponse } from "next/server"

// Post Category 
export const POST = async (req, res) => {
    try {
        await connectDB();
        const body = await req.json();
        const category = await categoryDB.create(body);

        //success 
        return NextResponse.json({
            message: 'Category add successfully !',
            success: true,
            status: 201,
            category
        })
    } catch (error) {
        return NextResponse.json({
            message: 'Category add fail..',
            error: error?.message,
            status: 500
        })
    }
}

