'use client';

import DepositSection from "@/app/components/dashboard/escrow-deposit/DepositSection";
import Loading from "@/app/components/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { MULTISIG_WALLET_CONTRACT_ADDRESS } from "@/lib/contracts";
import { client } from "@/lib/client";
import { getContract, prepareContractCall } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { parseEther } from "viem/utils";
import { useSendTransaction } from "thirdweb/react";

function CreateTx() {
  const searchParams = useSearchParams();
  const tx_id = searchParams.get("tx_id") || "";
  const [sellerAddress, setSellerAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [transactionCreated, setTransactionCreated] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { mutateAsync: sendTransaction } = useSendTransaction();

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
        // Prepare contract call
        const contract = getContract({
          client: client,
          chain: baseSepolia,
          address: MULTISIG_WALLET_CONTRACT_ADDRESS,
        });
        const amountInWei = parseEther(amount);
        const createTransaction = prepareContractCall({
          contract,
          method: "function createTransaction(bytes32 txId, address seller, uint256 amount)",
          params: [
            tx_id as `0x${string}`,
            sellerAddress as `0x${string}`,
            amountInWei,
          ],
        });
        // Send transaction and get result
        const result = await sendTransaction(createTransaction);
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
        alert("Transaction created successfully! Tx Hash: " + (result?.transactionHash || JSON.stringify(result)));
      } catch (error: unknown) {
        alert(error instanceof Error ? `Failed: ${error.message}` : 'Failed: Please try again.');
      } finally {
        setSubmitLoading(false);
      }
    },
    [tx_id, sellerAddress, amount, validateForm, sendTransaction]
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
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 w-full"
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