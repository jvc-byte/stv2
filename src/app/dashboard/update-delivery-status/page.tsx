"use client";
import { useState } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";

export default function UpdateDeliveryStatusPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <UpdateDeliveryStatusPage />
    </Suspense>
  );
}

function UpdateDeliveryStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tx_id = searchParams.get("tx_id");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateStatus = async () => {
    if (!tx_id) {
      setError("Transaction ID is missing");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/dashboard/transaction-details/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tx_id,
          status: "5",
          message: "Delivering"
        })
      });
      const data = await response.json();
      if (response.ok && data.success !== false) {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/dashboard/transaction-progress?tx_id=${tx_id}`);
        }, 1500);
      } else {
        setError(data.message || "Failed to update status");
      }
    } catch (error) {
      setError(`Error updating status: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Delivery Status</h1>
        <p className="mb-4 text-gray-700 text-center">
          Click the button below to update this transaction as <b>Delivering</b>.
        </p>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success ? (
          <div className="mb-4 text-green-600 text-center">Status updated! Redirecting...</div>
        ) : (
          <button
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition disabled:opacity-60"
            onClick={handleUpdateStatus}
            disabled={loading}
          >
            {loading ? "Updating..." : "Mark as Delivering"}
          </button>
        )}
      </div>
    </div>
  );
}
