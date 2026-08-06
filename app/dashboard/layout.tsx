import { OfficeSidebar } from '@/components/office-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <OfficeSidebar />
      {children}
    </SidebarProvider>
  );
}
