"use client";
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TransactionStatus from '@/app/components/dashboard/transactions/TransactionStatus';

interface TransactionProgressState {
    status: string;
    currentStep: number;
    totalSteps: number;
    lastUpdated: string;
    statusMessage?: string;
}

function TransactionProgressContent() {
    const searchParams = useSearchParams();
    const tx_id = searchParams.get('tx_id');
    const [status, setStatus] = useState<TransactionProgressState>({
        status: '0',
        currentStep: 1,
        totalSteps: 8,
        lastUpdated: new Date().toISOString()
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!tx_id) {
            setError('No transaction ID provided');
            return;
        }

        const fetchTransactionStatus = async () => {
            try {
                const response = await fetch(`/api/dashboard/transaction-details/${tx_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch transaction status');
                }

                const data = await response.json();
                
                let currentStep = 1;
                switch (data.status) {
                    case '0': // Escrow Initialized
                        currentStep = 1;
                        break;
                    case '1': // Seller Reviewing
                        currentStep = 2;
                        break;
                    case '2': // Awaiting Payment
                        currentStep = 3;
                        break;
                    case '3': // Payment Processing
                        currentStep = 4;
                        break;
                    case '4': // Payment Completed
                        currentStep = 5;
                        break;
                    case '5': // Delivering
                        currentStep = 6;
                        break;
                    case '6': // Buyer Confirming
                        currentStep = 7;
                        break;
                    case '7': // Buyer Approved
                    case '14': // Completed
                        currentStep = 8;
                        break;
                    case '11': // Cancelled
                    case '16': // Awaiting modification
                    case '17': // Failed
                        currentStep = 1;
                        break;
                }

                setStatus({
                    status: data.status,
                    currentStep,
                    totalSteps: 8,
                    lastUpdated: new Date().toISOString(),
                    statusMessage: data.status_message
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch transaction status');
            }
        };

        fetchTransactionStatus();
        const interval = setInterval(fetchTransactionStatus, 30000);

        return () => clearInterval(interval);
    }, [tx_id]);

    const steps = [
        { id: 1, name: 'Transaction Created', description: 'Transaction details have been sent to the seller' },
        { id: 2, name: 'Seller Review', description: 'Waiting for seller to review and accept the transaction' },
        { id: 3, name: 'Payment', description: 'Waiting for buyer to make payment' },
        { id: 4, name: 'Payment Processing', description: 'Processing payment and setting up escrow' },
        { id: 5, name: 'Payment Deposited', description: 'Payment has been deposited successfully' },
        { id: 6, name: 'Awaiting Delivery', description: 'Waiting for seller to deliver the item' },
        { id: 7, name: 'Delivery Received', description: 'Delivery has been received successfully' },
        { id: 8, name: 'Transaction Complete', description: 'Transaction has been completed successfully' }
    ];

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Failed to fetch transaction details</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-8 text-center sm:text-left">Transaction Progress</h1>
            
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Current Status</h2>
                        <p className="text-xs sm:text-sm text-gray-500">Last updated: {new Date(status.lastUpdated).toLocaleString()}</p>
                        {status.statusMessage && (
                            <p className="text-sm text-gray-600 mt-1">{status.statusMessage}</p>
                        )}
                    </div>
                    <div className="self-start sm:self-center">
                        <TransactionStatus status={status.status} />
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="hidden sm:block h-0.5 w-full bg-gray-200"></div>
                </div>
                
                <ul className="relative flex flex-col sm:flex-row justify-evenly gap-8 sm:gap-4">
                    {steps.map((step, index) => (
                        <li key={step.id} className={`flex ${index === 0 ? 'sm:flex-col' : 'flex-row sm:flex-col'} items-start sm:items-center gap-4 sm:gap-0`}>
                            <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                                ${step.id < status.currentStep ? 'bg-teal-600' :
                                step.id === status.currentStep ? 'bg-teal-600 ring-4 ring-teal-100' :
                                'bg-gray-200'}`}>
                                {step.id < status.currentStep ? (
                                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={`text-sm font-medium ${step.id === status.currentStep ? 'text-white' : 'text-gray-500'}`}>
                                        {step.id}
                                    </span>
                                )}
                            </div>
                            
                            <div className="sm:mt-2 min-w-0 sm:min-w-[120px] sm:text-center flex-1 sm:flex-none">
                                <div className="text-sm font-medium text-gray-900">{step.name}</div>
                                <div className="text-xs text-gray-500 sm:mt-1">{step.description}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center gap-2">
                <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full sm:w-auto bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                >
                    Back to Dashboard
                </button>
                <button
                    onClick={() => window.location.href = '/dashboard/dispute'}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                    Dispute
                </button>
            </div>
        </div>
    );
}

export default function TransactionProgress() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <TransactionProgressContent />
        </Suspense>
    );
}
