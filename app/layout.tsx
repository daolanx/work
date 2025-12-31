import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from 'next-intl/server';
import { ClerkProvider } from '@clerk/nextjs'
import "@/app/globals.css";

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();

  return (<ClerkProvider>
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
