import config from "@/feast.config";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/ui/providers";

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        primaryFont.variable,
        secondaryFont.variable,
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
