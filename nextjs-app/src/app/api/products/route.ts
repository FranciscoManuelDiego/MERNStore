import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Product from '../../../models/Product';


// Get all products by pagination
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '6', 10); // Fixed: use 10 as radix
        // parseInt('6', 10) parses '6' as base-10 (decimal) number
        // Returns 6 as expected
        const skip = (page - 1) * limit;

        console.log('API params:', { category, page, limit, skip }); // Debug

        let query = {};
        if (category && category !== 'all') {
            query = { category: category };
        }

        console.log('MongoDB query:', query); // Debug

    // Get the total count for pagination
        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        console.log('Pagination calculation:', { totalCount, limit, totalPages }); // Debug

        const products = await Product.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

        console.log(`Returning ${products.length} products for page ${page}`); // Debug
        console.log('Final response:', { 
            productsLength: products.length,
            totalCount,
            page, 
            totalPages,
            hasMore: page < totalPages
        }); // Debug
        
        return NextResponse.json({ 
            products, 
            totalCount,
            page, 
            totalPages,
            hasMore: page < totalPages
        });
    } catch (error) {
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
    } catch (error) {
        console.error('Product update error:', error);
        return NextResponse.json(
            { error: 'Error updating product' },
            { status: 500 }
        );
    }
}



export async function POST(request: NextRequest){
        try {
            await connectDB();
            const body = await request.json();
        // Check if it's an array of products
        if (Array.isArray(body)) {
            const newProducts = await Product.insertMany(body);
            return NextResponse.json(newProducts);
        } else {
            // Single product creation (current behavior)
            const newProduct = new Product(body);
            await newProduct.save();
            return NextResponse.json(newProduct);
        }
    } catch (error) {
        console.error('Product creation error:', error);
        return NextResponse.json(
            { error: 'Error creating product(s)' },
            { status: 500 }
        );
    }
}