'use client';
import { ConnectButton, lightTheme } from "thirdweb/react";
import { client } from "@/client";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export default function SignInButton() {
    const wallets = [
        inAppWallet({
          auth: {
            options: ["google", "discord", "telegram", "farcaster", "email", "x", "passkey", "phone", "facebook", "github", "twitch", "apple",],
          },
        }),
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
        createWallet("io.rabby"),
        createWallet("io.zerion.wallet"),
      ];

    return (
        <ConnectButton
            client={client}
            wallets={wallets}
            detailsButton={{
                style: {
                    background: "white",
                }
            }}
            theme={lightTheme({
                colors: {
                    modalBg: "hsl(0, 0%, 100%)",
                    borderColor: "hsl(262, 11%, 86%)",
                    accentText: "hsl(175, 100%, 36%)",
                    separatorLine: "hsl(180, 100%, 78%)",
                    tertiaryBg: "hsl(167, 100%, 91%)",
                    skeletonBg: "hsl(183, 15%, 68%)",
                    primaryText: "hsl(257, 4%, 21%)",
                    secondaryText: "hsl(249, 1%, 60%)",
                    selectedTextColor: "hsl(300, 1%, 49%)",
                    inputAutofillBg: "hsl(0, 0.00%, 98.00%)",
                },
            })}
            connectButton={{ label: "Sign In" }}
            connectModal={{
                size: "wide",
                title: "Welcome ",
                titleIcon:
                    "https://sealed-trust.vercel.app/favicon.ico",
                showThirdwebBranding: false,
                termsOfServiceUrl: "https:// sealedtrust.com",
                privacyPolicyUrl: "https:// sealedtrust.com",
            }}
            
        />
    );
};
