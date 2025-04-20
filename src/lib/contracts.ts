export const CREATE_ESCROW_CONTRACT_ADDRESS = "0xe0b5d411c8DF13318E8CF367a66eC6B541bd9045"
export const CREATE_ESCROW_CONTRACT_ABI = [{ "inputs": [{ "internalType": "address", "name": "setOwner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowID", "type": "uint256" }], "name": "EscrowCompleted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowID", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "initiator", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "description", "type": "string" }], "name": "EscrowCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowID", "type": "uint256" }], "name": "EscrowId", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowID", "type": "uint256" }], "name": "EscrowRefunded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowID", "type": "uint256" }], "name": "ItemDelivered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_role", "type": "string" }, { "internalType": "string", "name": "_currency", "type": "string" }, { "internalType": "uint256", "name": "_inspection_period", "type": "uint256" }, { "internalType": "string", "name": "_item_name", "type": "string" }, { "internalType": "uint256", "name": "_price", "type": "uint256" }, { "internalType": "string", "name": "_item_category", "type": "string" }, { "internalType": "string", "name": "_item_description", "type": "string" }, { "internalType": "string", "name": "_shipping_method", "type": "string" }, { "internalType": "string", "name": "_shipping_fee_paid_by", "type": "string" }], "name": "createEscrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "escrowCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "escrowID", "type": "uint256" }], "name": "getAllEscrowByID", "outputs": [{ "components": [{ "internalType": "uint256", "name": "escrow_id", "type": "uint256" }, { "internalType": "address payable", "name": "initiator", "type": "address" }, { "internalType": "string", "name": "transaction_title", "type": "string" }, { "internalType": "string", "name": "role", "type": "string" }, { "internalType": "string", "name": "currency", "type": "string" }, { "internalType": "uint256", "name": "inspection_period", "type": "uint256" }, { "internalType": "string", "name": "item_name", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "string", "name": "item_category", "type": "string" }, { "internalType": "string", "name": "item_description", "type": "string" }, { "internalType": "string", "name": "shipping_method", "type": "string" }, { "internalType": "string", "name": "shipping_fee_paid_by", "type": "string" }, { "internalType": "enum CreateEscrow.Escrowstatus", "name": "escrow_status", "type": "uint8" }, { "internalType": "uint256", "name": "created_on", "type": "uint256" }], "internalType": "struct CreateEscrow.EscrowData", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllEscrows", "outputs": [{ "components": [{ "internalType": "uint256", "name": "escrow_id", "type": "uint256" }, { "internalType": "address payable", "name": "initiator", "type": "address" }, { "internalType": "string", "name": "transaction_title", "type": "string" }, { "internalType": "string", "name": "role", "type": "string" }, { "internalType": "string", "name": "currency", "type": "string" }, { "internalType": "uint256", "name": "inspection_period", "type": "uint256" }, { "internalType": "string", "name": "item_name", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "string", "name": "item_category", "type": "string" }, { "internalType": "string", "name": "item_description", "type": "string" }, { "internalType": "string", "name": "shipping_method", "type": "string" }, { "internalType": "string", "name": "shipping_fee_paid_by", "type": "string" }, { "internalType": "enum CreateEscrow.Escrowstatus", "name": "escrow_status", "type": "uint8" }, { "internalType": "uint256", "name": "created_on", "type": "uint256" }], "internalType": "struct CreateEscrow.EscrowData[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "initiator", "type": "address" }], "name": "getEscrowsByInitiator", "outputs": [{ "components": [{ "internalType": "uint256", "name": "escrow_id", "type": "uint256" }, { "internalType": "address payable", "name": "initiator", "type": "address" }, { "internalType": "string", "name": "transaction_title", "type": "string" }, { "internalType": "string", "name": "role", "type": "string" }, { "internalType": "string", "name": "currency", "type": "string" }, { "internalType": "uint256", "name": "inspection_period", "type": "uint256" }, { "internalType": "string", "name": "item_name", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "string", "name": "item_category", "type": "string" }, { "internalType": "string", "name": "item_description", "type": "string" }, { "internalType": "string", "name": "shipping_method", "type": "string" }, { "internalType": "string", "name": "shipping_fee_paid_by", "type": "string" }, { "internalType": "enum CreateEscrow.Escrowstatus", "name": "escrow_status", "type": "uint8" }, { "internalType": "uint256", "name": "created_on", "type": "uint256" }], "internalType": "struct CreateEscrow.EscrowData[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export const MULTISIG_WALLET_CONTRACT_ADDRESS = "0x051d22882b856f02b3812E5E037c0D0f0d0854B6";
export const MULTISIG_WALLET_CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_initialSigners",
          "type": "address[]"
        },
        {
          "internalType": "uint8",
          "name": "_requiredApprovals",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "signer",
          "type": "address"
        }
      ],
      "name": "ApprovalSubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "payer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "raiser",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "reason",
          "type": "string"
        }
      ],
      "name": "DisputeRaised",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isBuyerWon",
          "type": "bool"
        }
      ],
      "name": "DisputeResolved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Refund",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Release",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "signer",
          "type": "address"
        }
      ],
      "name": "SignerAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "signer",
          "type": "address"
        }
      ],
      "name": "SignerRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TransactionCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newSigner",
          "type": "address"
        }
      ],
      "name": "addSigner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allTransactionIds",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "newRequired",
          "type": "uint8"
        }
      ],
      "name": "changeRequiredApprovals",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "createTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTransactionIds",
      "outputs": [
        {
          "internalType": "bytes32[]",
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSigners",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "getTransactionDetails",
      "outputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isReleased",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isRefunded",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isDisputed",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "disputeReason",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isBuyerWon",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "approvalCount",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "signer",
          "type": "address"
        }
      ],
      "name": "hasApproved",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isSigner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "reason",
          "type": "string"
        }
      ],
      "name": "raiseDispute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "refund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "signerToRemove",
          "type": "address"
        }
      ],
      "name": "removeSigner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "requiredApprovals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "isBuyerWon",
          "type": "bool"
        }
      ],
      "name": "resolveDispute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "signers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "transactionExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isReleased",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isRefunded",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isDisputed",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "disputeReason",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isBuyerWon",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "approvalCount",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "usedTxIds",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]