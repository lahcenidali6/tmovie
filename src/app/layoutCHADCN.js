import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import localFont from 'next/font/local';
const moonjelly = localFont({
  src: [
    {
      path: '../../public/fonts/Moonjelly-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Moonjelly-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-moonjelly',
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
