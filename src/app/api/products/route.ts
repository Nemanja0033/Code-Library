
import { NextResponse } from 'next/server';
import db from '@/db/db';

export async function GET() {
    try {
        const products = await db.product.findMany({
            select: {
                id: true,
                name: true,
                priceInCents: true,
                isAvailableForPurchase: true,
                _count: { select: { orders: true } }
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.error();
    }
}
