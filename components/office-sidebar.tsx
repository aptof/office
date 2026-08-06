import NavHeader from '@/components/nav-header';
import NavMain from '@/components/nav-main';
import NavUser from '@/components/nav-user';
import { Sidebar } from '@/components/ui/sidebar';

export function OfficeSidebar() {
  return (
    <Sidebar>
      <NavHeader />
      <NavMain />
      <NavUser />
    </Sidebar>
  );
}
