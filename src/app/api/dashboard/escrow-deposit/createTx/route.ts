import { NextRequest, NextResponse } from "next/server";
import {createTransactions} from "../createTx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const txHash = await createTransactions(formData);
    return NextResponse.json({ txHash });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
