import type {Metadata} from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'ATHAR | أثر لعطور الرفاهية',
  description: 'اترك أثرك مع كل رشة. عطور مستوحاة من أشهر العطور العالمية بجودة عالية وثبات وفوحان يدومان طوال اليوم.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={`${playfair.variable} ${poppins.variable} scroll-smooth`}>
      <body className="font-poppins text-white-pure antialiased bg-black-main overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
