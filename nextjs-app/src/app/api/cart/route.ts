import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Cart from '../../../models/Cart';


//Get parameters
export async function GET(request: NextRequest){
    try{
        await connectDB();
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('userId');
        const cart = await Cart.findOne({userId});
        return NextResponse.json(cart);
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Failed to retrieve cart"});
    }
};

//POST method
export async function POST(request: NextRequest){
    try{
        await connectDB();
        const {userId, productId, quantity} = await request.json();
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = await Cart.create({
                userId,
                items: [{productId, quantity}]
            });
        }else{
            const itemIndex = cart.items.findIndex((item : {productId: string, quantity: number}) => item.productId.toString() === productId);
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            }else{
                cart.items.push({productId, quantity});
            }
            await cart.save();
        }
        return NextResponse.json(cart);
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Failed to add item to cart"});
    }
};

//Put method

export async function PUT(request: NextRequest){
    try{
        await connectDB();
        const {userId, productId, quantity} = await request.json();
        const cart = await Cart.findOne({userId});
        if(!cart){
            return NextResponse.json({error: "Cart not found"});
        }
        const itemIndex = cart.items.findIndex((item : {productId: string, quantity: number}) => item.productId.toString() === productId);
        if(itemIndex > -1){
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            return NextResponse.json(cart);
        }else{
            return NextResponse.json({error: "Product not found in cart"});
        }
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Failed to update cart"});
    }
};
export async function DELETE(request: NextRequest){
    try{
        await connectDB();
        const {userId, productId} = await request.json();
        const cart = await Cart.findOne({userId});
        if(!cart){
            return NextResponse.json({error: "Cart not found"});
        }
        cart.items = cart.items.filter((item : {productId: string}) => item.productId.toString() !== productId);
        await cart.save();
        return NextResponse.json(cart);
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Failed to delete item from cart"});
    }
};


