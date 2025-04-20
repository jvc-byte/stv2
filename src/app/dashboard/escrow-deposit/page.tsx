'use client';
import { Suspense } from 'react';
import Loading from '@/app/components/Loading';
import CreateTx from '@/app/components/dashboard/escrow-deposit/CreateTx';

export default function EscrowDeposit() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateTx />
    </Suspense>
  );
}