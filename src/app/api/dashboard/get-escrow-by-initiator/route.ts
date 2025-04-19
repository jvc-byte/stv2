// app/api/escrows/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        // Get initiator_address from URL search params
        const searchParams = request.nextUrl.searchParams;
        const initiator_address = searchParams.get('initiator_address');

        if (!initiator_address) {
            return NextResponse.json(
                { error: 'Missing required initiator_address parameter' },
                { status: 400 }
            );
        }

        // Query transactions from database
        const result = await pool.query(
            `SELECT * FROM public.transaction_details 
             WHERE initiator_address = $1 
             ORDER BY timestamp DESC`,
            [initiator_address]
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}