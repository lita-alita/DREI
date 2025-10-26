import React, { createContext, useContext, useCallback, useMemo } from "react";
import { Address } from "viem";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

type WalletContextType = {
  isConnected: boolean;
  address: Address | undefined;
  isAdmin: boolean;
  isPending: boolean;
  connectWallet: () => void;
  disconnectWallet: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, address, status } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const isAdmin = Math.random() > 0.8;

  const connectWallet = useCallback(() => {
    // RainbowKit UI
    if (openConnectModal) openConnectModal();
  }, [openConnectModal]);

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnectAsync()
    } catch (e) {
      console.error(e)
    }
  }, [disconnectAsync])

  const value = useMemo(() => ({
    isConnected,
    address,
    isAdmin,
    isPending: status === "connecting" || status === "reconnecting",
    connectWallet,
    disconnectWallet,
  }), [isConnected,
    address,
    isAdmin,
    status,
    connectWallet,
    disconnectWallet])

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
};
