import { NextRequest, NextResponse } from "next/server";
import { deposit } from "../createTx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Validate required fields
    if (!formData.tx_id || !formData.amount) {
      return NextResponse.json(
        { error: "Both tx_id and amount are required" },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    const txHash = await deposit(formData);
    return NextResponse.json({ 
      success: true,
      txHash 
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Deposit failed" },
      { status: 500 }
    );
  }
}