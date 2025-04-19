import { useState } from "react";

// Helper to truncate hashes (e.g., 0x123456...abcd)
function truncateHash(hash?: string) {
    if (!hash) return '';
    if (hash.length <= 12) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

function TruncateAndCopy({ hash }: { hash?: string }) {
    const [copied, setCopied] = useState(false);
    if (!hash) return null;
    const truncated = truncateHash(hash);
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, position: 'relative' }}>
            <span>{truncated}</span>
            <button
                type="button"
                aria-label="Copy transaction hash"
                className="ml-1 text-xs px-1 py-0.5 border rounded bg-gray-100 hover:bg-gray-200 relative"
                onClick={() => {
                    navigator.clipboard.writeText(hash);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                }}
            >
                Copy
                {copied && (
                    <span
                        className="absolute left-1/2 -translate-x-1/2 -top-7 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow-lg"
                        style={{ pointerEvents: 'none' }}
                    >
                        Copied!
                    </span>
                )}
            </button>
        </span>
    );
}

export default TruncateAndCopy;