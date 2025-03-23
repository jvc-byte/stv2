import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Initialize PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

// Define the dynamic segment explicitly
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Extract tx_id from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const tx_id = pathParts[pathParts.length - 1];

    try {
        // Query the database for transaction details
        const query = 'SELECT * FROM transaction_details WHERE transaction_hash = $1';
        const result = await pool.query(query, [tx_id]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        const transactionDetails = result.rows[0];
        return NextResponse.json(transactionDetails);
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}