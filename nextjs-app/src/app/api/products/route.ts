import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Product from '../../../models/Product';


// Get all products
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        
        let query = {};
        if (category && category !== 'all') {
            query = { category: category };
        }
        
        const products = await Product.find(query);
        return NextResponse.json(products);
    } catch (error: any) {
        console.error('Products fetch error:', error);
        return NextResponse.json(
            { error: 'Error fetching products' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { id, ...updateData } = body;
        
        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(updatedProduct);
    } catch (error: any) {
        console.error('Product update error:', error);
        return NextResponse.json(
            { error: 'Error updating product' },
            { status: 500 }
        );
    }
}
