import Product from '../../../../models/Product'; 
import dbConnect from '../../../lib/mongodb'; 
import {NextRequest, NextResponse  } from 'next/server';

export async function GET(request: NextRequest) {
  // Connect to the database
  await dbConnect();

  // Extract the search query from the URL parameters
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('q');

  if (!searchTerm) {
    return NextResponse.json({ message: 'Missing search query.' }, { status: 400 });
  }

  try {
    const products = await Product.find({
      $text: { $search: searchTerm },
    }, { score: { $meta: 'textScore' } }) // Include score for sorting relevancy
    .sort({ score: { $meta: 'textScore' } }) // Sort by relevancy
    .limit(5) // Limit results for performance
    .exec();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: 'Error searching for products.', error }, { status: 500 });
  }
}