'use client';
import { ConnectButton, lightTheme } from "thirdweb/react";
import { client } from "@/lib/client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { NextPage } from "next";
import { defineChain } from "thirdweb";
import { generatePayload, isLoggedIn, login, logout } from "../api/auth/auth";


const SignInButton: NextPage = () => {

    const wallets = [
        inAppWallet({
            auth: {
                options: ["google", "discord", "telegram", "farcaster", "email", "x", "passkey", "phone", "facebook", "github", "apple"],
            },
            hidePrivateKeyExport: true,
        }),
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
        createWallet("io.rabby"),
        createWallet("io.zerion.wallet"),
    ];

    const chainID = 8453;

    return (

        <ConnectButton
            client={client}
            wallets={wallets}
            accountAbstraction={{
                chain: defineChain(chainID),
                sponsorGas: true,
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
            connectButton={{
                label: "Sign In",
            }}
            connectModal={{
                size: "wide",
                title: "Welcome",
                titleIcon: "/logo.png",
                showThirdwebBranding: false,
                termsOfServiceUrl: "https://sealedtrust.com",
                privacyPolicyUrl: "https://sealedtrust.com",
            }}
            auth={{
                isLoggedIn: async (address) => {
                    console.log("checking if logged in!", { address });
                    return await isLoggedIn();
                },
                
                doLogin: async (params) => {
                    console.log("logging in!");
                    await login(params);
                },

                getLoginPayload: async ({ address }) => generatePayload({ address, chainId: chainID }),

                doLogout: async () => {
                    console.log("logging out!");
                    await logout();
                },
            }}
        />
    );
};

export default SignInButton;