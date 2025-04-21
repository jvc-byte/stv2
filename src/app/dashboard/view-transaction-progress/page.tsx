"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function ViewTransactionProgressPage() {
  const router = useRouter();
  const [inputTxId, setInputTxId] = useState("");
  const [error, setError] = useState("");

  // Zod schema for tx_id validation
  const txIdSchema = z.string().startsWith("0x").length(66, { message: "Transaction ID must be a 66-character 0x-prefixed string." });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parseResult = txIdSchema.safeParse(inputTxId.trim());
    if (!parseResult.success) {
      setError(parseResult.error.errors[0].message || "Invalid transaction ID.");
      return;
    }
    setError("");
    // Route to transaction details page
    router.push(`/dashboard/transaction-progress?tx_id=${inputTxId.trim()}`);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">View Transaction Progress</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Transaction ID</label>
          <input
            type="text"
            value={inputTxId}
            onChange={e => setInputTxId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter transaction ID (0x...)"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          View Progress
        </button>
      </form>
    </div>
  );
}
