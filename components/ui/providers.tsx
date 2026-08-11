"use client";

import BusinessContextProvider from "@/contexts/business-context";
import { Business } from "@/schema";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Toaster } from "./sonner";
import { ThemeProvider } from "./theme-provider";

export function Providers({
  business,
  children,
}: {
  business: Business;
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <BusinessContextProvider initialBusiness={business}>
          <div className="flex flex-col min-h-dvh">
            <Navbar />
            <main className="page-wrapper">{children}</main>
            <Footer />
          </div>
        </BusinessContextProvider>
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  );
}
