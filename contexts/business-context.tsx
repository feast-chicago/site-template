"use client";

import config from "@/feast.config";
import { Business } from "@/schema";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

type BusinessContext = {
  lastUpdated: string;
  // Participants
  setLastUpdated: React.Dispatch<React.SetStateAction<string>>;
  business: Business | null;
  setBusiness: React.Dispatch<React.SetStateAction<Business | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BusinessContext = createContext<BusinessContext | null>(null);

export default function BusinessContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useAuth();

  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [business, setBusiness] = useState<Business | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!isLoaded) return;
      setIsLoading(true);

      try {
        const res = await fetch(`/api/businesses?id=${config.id}`, {
          // 3600 = 1 hr
          // next: {
          //   revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
          // },
        });

        if (!res.ok) {
          setBusiness(null);
          setError("There was an error loading your business' info.");
          return;
        }

        const data: Business = await res.json();
        setBusiness(data);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusiness();
  }, [isLoaded, lastUpdated]);

  return (
    <BusinessContext.Provider
      value={{
        lastUpdated,
        setLastUpdated,
        business,
        setBusiness,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessContext() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error(
      "useBusinessContext must be used within a BusinessContextProvider.",
    );
  }
  return context;
}
