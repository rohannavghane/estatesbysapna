import { Outlet } from 'react-router';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { WhatsAppButton } from './whatsapp-button';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
