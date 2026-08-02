import config from "@/feast.config";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/ui/providers";
import { join } from "path";
import { readFile } from "fs/promises";

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the generated CSS file from disk
  const cssPath = join(process.cwd(), "app", "globals.css");
  const css = await readFile(cssPath, "utf8");

  // Extract only the :root and .dark blocks
  const rootMatch = css.match(/:root\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const darkMatch = css.match(/\.dark\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const cssVars = `${rootMatch}\n${darkMatch}`;

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
