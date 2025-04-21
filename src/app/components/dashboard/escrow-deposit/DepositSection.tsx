'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

function DepositSection({ tx_id, amount }: { tx_id: string; amount: string }) {
  const [depositTxId, setDepositTxId] = useState(tx_id);
  const [depositAmount, setDepositAmount] = useState(amount);
  const [depositLoading, setDepositLoading] = useState(false);

  const router = useRouter();

  const handleDepositSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Client-side validation
      if (!depositTxId || !depositAmount) {
        alert("Please fill in all fields");
        return;
      }

      if (isNaN(parseFloat(depositAmount))) {
        alert("Please enter a valid amount");
        return;
      }

      setDepositLoading(true);

      try {
        const response = await fetch("/api/dashboard/escrow-deposit/depositTx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_id: depositTxId,
            amount: depositAmount,
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to deposit");
        }

        alert(`Deposit successful!\nTransaction Hash: ${data.txHash}`);
        // Update transaction status in the database before redirecting
        await fetch(`/api/dashboard/transaction-details/update-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_id: depositTxId,
            status: "4",
            message: "Money deposited to multisig wallet"
          })
        });
        // Send email to seller to deliver the product (status-based, no type)
        await fetch("/api/email/send-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_id: depositTxId,
            status: "5"
          })
        });
        // Redirect to transaction-progress page after successful deposit
        router.push(`/dashboard/transaction-progress?tx_id=${depositTxId}`);
      } catch (error: unknown) {
        console.error("Deposit error:", error);
        alert(error instanceof Error ? error.message : "Deposit failed. Please try again.");
      } finally {
        setDepositLoading(false);
      }
    },
    [depositTxId, depositAmount, router]
  );

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-blue-50 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-2">Deposit</h2>
      <form className="space-y-4" onSubmit={handleDepositSubmit}>
        <div>
          <label className="block font-medium text-justify">Transaction ID</label>
          <input
            type="text"
            name="deposit_tx_id"
            value={depositTxId}
            onChange={e => setDepositTxId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-justify">Amount (ETH)</label>
          <input
            type="number"
            name="deposit_amount"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            step="0.0001"
            min="0.0001"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          disabled={depositLoading}
        >
          {depositLoading ? "Processing..." : "Make Deposit"}
        </button>
      </form>
    </div>
  );
}

export default DepositSection;
