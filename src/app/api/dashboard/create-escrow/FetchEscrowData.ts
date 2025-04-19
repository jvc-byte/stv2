// api/dashboard/create-escrow/FetchEscrowData.ts
import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Escrow, RawEscrow } from '@/app/api/types';

export const FetchEscrowsData = () => {
  const account = useActiveAccount();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [escrowsData, setEscrowsData] = useState<Escrow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!account?.address) {
        setIsPending(false);
        return;
      }

      try {
        setIsPending(true);
        const response = await axios.get('/api/dashboard/get-escrow-by-initiator', {
          params: { initiator_address: account.address }
        });

        if (response.data && Array.isArray(response.data)) {
          const structuredEscrows = response.data.map((escrow: RawEscrow) => ({
            escrow_id: escrow.transaction_id.toString(),
            initiator: escrow.initiator_address,
            transaction_title: escrow.escrow_title,
            role: escrow.initiator_role,
            currency: escrow.currency,
            inspection_period: escrow.inspection_period,
            item_name: escrow.item_name,
            price: escrow.item_price.toString(),
            item_category: escrow.item_category,
            item_description: escrow.item_description,
            shipping_method: escrow.shipping_method,
            shipping_fee_paid_by: escrow.shipping_fee_paid_by,
            escrow_status: escrow.status || "0",
            created_on: new Date(escrow.timestamp).toLocaleString(),
            transaction_hash: escrow.transaction_hash,
            block_explorer_url: escrow.block_explorer_url,
            chain_name: escrow.chain_name,
            status_message: escrow.status_message
          }));

          setEscrowsData(structuredEscrows);
        }
      } catch (err) {
        console.error("Error fetching escrows:", err);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [account?.address]);

  return { escrowsData, isPending, account };
};