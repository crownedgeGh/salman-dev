import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://brokerboss.in'),
  title: {
    default: 'BrokerBoss – Find Properties in Raipur, Chhattisgarh',
    template: '%s | BrokerBoss',
  },
  description:
    'BrokerBoss is Raipur\'s trusted real estate listing platform. Browse houses, flats, shops, plots, offices and more in Raipur, Chhattisgarh.',
  keywords: ['real estate', 'property', 'Raipur', 'Chhattisgarh', 'house', 'flat', 'shop', 'plot', 'broker'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'BrokerBoss',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <TooltipProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
