import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Product from '../../../models/Product';


// Get all products by pagination
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '6', 10);
        const skip = (page - 1) * limit;

        //console.log('📝 API params:', { category, page, limit, skip });

        // Get ALL products first to see what we have
        const allProducts = await Product.find({}).limit(5);
        //console.log('📂 Sample products from DB:', allProducts.map(p => ({
        //    name: p.name,
        //    category: p.category,
        //    id: p._id
        //})));

        // Get all unique categories (case-sensitive)
        const allCategories = await Product.distinct('category');
        console.log('📂 Available categories in DB:', allCategories);

        let query = {};
        if (category && category !== 'all') {
            // Try case-insensitive search
            query = { 
                category: { 
                    $regex: new RegExp(`^${category}$`, 'i') // Case-insensitive exact match
                }
            };
           // console.log('🔍 Using case-insensitive query:', query);
        }

        const totalCount = await Product.countDocuments(query);
        console.log('📊 Total documents matching query:', totalCount);
        
        if (totalCount === 0 && category) {
            console.log('⚠️ No products found for category:', category);
            console.log('⚠️ Available categories:', allCategories);
            console.log('⚠️ Check if category name matches exactly (case-sensitive)');
        }

        const totalPages = Math.ceil(totalCount / limit);

        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

       // console.log('📦 Products found:', products.length);

        return NextResponse.json({ 
            products, 
            totalCount,
            page, 
            totalPages,
            hasMore: page < totalPages,
            debug: {
                query,
                allCategories,
                requestedCategory: category,
                sampleProducts: allProducts.slice(0, 2)
            }
        });
    } catch (error) {
        console.error('❌ Products API error:', error);
        return NextResponse.json(
            { error: 'Error fetching products', details: error instanceof Error ? error.message : 'Unknown error' },
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