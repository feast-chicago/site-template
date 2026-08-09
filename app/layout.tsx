import { Providers } from "@/components/ui/providers";
import config from "@/feast.config";
import { getBusiness } from "@/lib/business";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import { cn, createTheme, generateCssVariables } from "@/lib/utils";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const business = await getBusiness();
  const theme = business.theme;
  const createdTheme = createTheme(theme);
  const cssVars = generateCssVariables(createdTheme);

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
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
