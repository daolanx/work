import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import '@/app/globals.css';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const afterSignOutUrl =
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || '/';

  return (
    <ClerkProvider afterSignOutUrl={afterSignOutUrl}>
      <html lang={locale} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="f6e47b9c-c1f0-4c75-9bcd-843e2630e8b3"
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
