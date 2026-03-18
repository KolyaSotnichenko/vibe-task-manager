import '@/styles/globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
