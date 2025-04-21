'use client';

import DepositSection from "@/app/components/dashboard/escrow-deposit/DepositSection";
import Loading from "@/app/components/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function CreateTx() {
  const searchParams = useSearchParams();
  const tx_id = searchParams.get("tx_id") || "";
  const [sellerAddress, setSellerAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [transactionCreated, setTransactionCreated] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch amount from DB based on tx_id
  useEffect(() => {
    if (!tx_id) return;
    fetch(`/api/dashboard/transaction-details/${tx_id}`)
      .then(res => res.json())
      .then(data => {
        setAmount(data?.item_price?.toString() || "");
      })
      .catch(() => { });
  }, [tx_id]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!tx_id.trim()) newErrors.tx_id = "Transaction ID is required";
    if (!sellerAddress.trim()) newErrors.sellerAddress = "Seller address is required";
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) < 0.0001) newErrors.amount = "Amount must be at least 0.0001";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [tx_id, sellerAddress, amount]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      setSubmitLoading(true);
      try {
        // Call backend API to create the transaction
        const response = await fetch("/api/dashboard/escrow-deposit/createTx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_id,
            sellerAddress,
            price: Number(amount),
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Failed to create transaction");
        // Update transaction status in the database before showing success
        await fetch(`/api/dashboard/transaction-details/update-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_id,
            status: "3",
            message: "Payment Processing"
          })
        });
        setTransactionCreated(true);
        alert("Transaction created successfully! Tx Hash: " + (data?.txHash || data));
      } catch (error: unknown) {
        alert(error instanceof Error ? `Failed: ${error.message}` : 'Failed: Please try again.');
      } finally {
        setSubmitLoading(false);
      }
    },
    [sellerAddress, amount, validateForm, tx_id]
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Escrow Deposit</h1>
        <div>
          <label className="block font-medium">Transaction ID</label>
          <input
            type="text"
            name="tx_id"
            value={tx_id}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
          {errors.tx_id && <p className="text-red-500 text-sm mt-1">{errors.tx_id}</p>}
        </div>
        <div>
          <label className="block font-medium">Seller Address</label>
          <input
            type="text"
            name="sellerAddress"
            value={sellerAddress}
            onChange={e => setSellerAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.sellerAddress && <p className="text-red-500 text-sm mt-1">{errors.sellerAddress}</p>}
        </div>
        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            readOnly
            min={0.0001}
            step={0.0001}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>
        {transactionCreated && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-center">Transaction Initiated on Blockchain!</div>
        )}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
          disabled={submitLoading || transactionCreated}
        >
          {submitLoading ? "Initiating..." : transactionCreated ? "Initiated" : "Initiate Transaction"}
        </button>
      </form>
      {/* Deposit section only shows after transaction is created */}
      {transactionCreated && (
        <Suspense fallback={<Loading />}>
          <DepositSection tx_id={tx_id} amount={amount} />
        </Suspense>
      )}
    </>
  );
}

export default CreateTx;