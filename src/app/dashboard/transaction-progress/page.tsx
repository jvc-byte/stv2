"use client";
import { useState } from 'react';
import TransactionStatus from '@/app/components/dashboard/transactions/TransactionStatus';

interface TransactionProgressState {
    status: string; // Status code as string ('0' to '18')
    currentStep: number;
    totalSteps: number;
    lastUpdated: string;
}

export default function TransactionProgress() {
    const [status] = useState<TransactionProgressState>({
        status: '1', // Starting with 'Awaiting Payment'
        currentStep: 1,
        totalSteps: 7,
        lastUpdated: new Date().toISOString()
    });

    const steps = [
        { id: 1, name: 'Transaction Created', description: 'Transaction details have been sent to the seller' },
        { id: 2, name: 'Seller Review', description: 'Waiting for seller to review and accept the transaction' },
        { id: 3, name: 'Payment Processing', description: 'Processing payment and setting up escrow' },
        { id: 4, name: 'Payment Completed', description: 'Payment has been completed successfully' },
        { id: 5, name: 'Awaiting Delivery', description: 'Waiting for seller to deliver the item' },
        { id: 6, name: 'Delivery Received', description: 'Delivery has been received successfully' },
        { id: 7, name: 'Transaction Complete', description: 'Transaction has been completed successfully' }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-8 text-center sm:text-left">Transaction Progress</h1>
            
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Current Status</h2>
                        <p className="text-xs sm:text-sm text-gray-500">Last updated: {new Date(status.lastUpdated).toLocaleString()}</p>
                    </div>
                    <div className="self-start sm:self-center">
                        <TransactionStatus status={status.status} />
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className=" hidden sm:block h-0.5 w-full bg-gray-200"></div>
                </div>
                
                {/* Steps List */}
                <ul className="relative flex flex-col sm:flex-row justify-evenly gap-8 sm:gap-4">
                    {steps.map((step, index) => (
                        <li key={step.id} className={`flex ${index === 0 ? 'sm:flex-col' : 'flex-row sm:flex-col'} items-start sm:items-center gap-4 sm:gap-0`}>
                            {/* Step Circle */}
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
                            
                            {/* Step Content */}
                            <div className="sm:mt-2 min-w-0 sm:min-w-[120px] sm:text-center flex-1 sm:flex-none">
                                <div className="text-sm font-medium text-gray-900">{step.name}</div>
                                <div className="text-xs text-gray-500 sm:mt-1">{step.description}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full sm:w-auto bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
