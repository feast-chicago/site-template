"use client";

import BusinessContextProvider from "@/contexts/business-context";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../Footer";
import { Toaster } from "./sonner";
import { ThemeProvider } from "./theme-provider";
import Navbar from "../Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <BusinessContextProvider>
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
