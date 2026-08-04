import { OfficeSidebar } from '@/components/office-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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
