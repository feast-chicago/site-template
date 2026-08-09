import { Providers } from "@/components/ui/providers";
import config from "@/feast.config";
import { getBusiness } from "@/lib/business";
import { cn, createTheme, generateCssVariables } from "@/lib/utils";
import { Metadata } from "next";
import "./globals.css";
import { GoogleFont } from "@/schema";

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

  const getGoogleFontUrl = (font: GoogleFont): string => {
    // Filter out italic and text-only variants
    const weights = font.variants
      .filter((variant) => !variant.includes("italic") && variant !== "regular")
      .map(Number)
      .filter(Boolean)
      .sort((a, b) => a - b);

    // Always include 400 (i.e., "regular") as the base weight
    if (!weights.includes(400)) weights.unshift(400);

    // Check if italic variants exist
    const hasItalic = font.variants.some((variant) =>
      variant.includes("italic"),
    );

    const family = font.family.replace(/ /g, "+");

    if (hasItalic) {
      // Google Fonts URL format for mixed italic + non-italic:
      // ital,wght@0,400;0,700;1,400;1,700
      const axes = [
        ...weights.map((weight) => `0,${weight}`),
        ...weights.map((weight) => `1,${weight}`),
      ].join(";");
      return `https://fonts.googleapis.com/css2?family=${family}:ital,wght@${axes}&display=swap`;
    }

    // Non-italic only: wght@400;700
    const axes = weights.join(";");
    return `https://fonts.googleapis.com/css2?family=${family}:wght@${axes}&display=swap`;
  };

  const { primary_font, secondary_font } = theme;
  const primaryFontUrl = getGoogleFontUrl(primary_font);
  const secondaryFontUrl = getGoogleFontUrl(secondary_font);
  const hasDifferentSecondaryFont: boolean =
    JSON.stringify(primary_font) !== JSON.stringify(secondary_font);

  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased")}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={primaryFontUrl} />
        {hasDifferentSecondaryFont && (
          <link rel="stylesheet" href={secondaryFontUrl} />
        )}
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      </head>
      <body
        style={{
          fontFamily: `"${primary_font.family}", ${primary_font.category}`,
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
