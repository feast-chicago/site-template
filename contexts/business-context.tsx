"use client";

import { Business } from "@/schema";
import { createContext, useContext, useState } from "react";

type BusinessContext = {
  business: Business;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
  lastUpdated: string;
  setLastUpdated: React.Dispatch<React.SetStateAction<string>>;
};

export const BusinessContext = createContext<BusinessContext | null>(null);

export default function BusinessContextProvider({
  children,
  initialBusiness,
}: {
  children: React.ReactNode;
  initialBusiness: Business;
}) {
  const [business, setBusiness] = useState<Business>(initialBusiness);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  return (
    <BusinessContext.Provider
      value={{ lastUpdated, setLastUpdated, business, setBusiness }}
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
