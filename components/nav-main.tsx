'use client';
import { routes } from '@/helpers/routes';
import { RouteLink } from '@/helpers/utility';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationGroup {
  title: string;
  route: string;
  routes: RouteLink[];
}

const navs: NavigationGroup[] = [
  {
    title: 'Main',
    route: '#',
    routes: [{ label: 'Home', route: routes.home }],
  },
  {
    title: 'Insight',
    route: '#',
    routes: [{ label: 'E-Verifiction', route: routes.everification }],
  },
];

export default function NavMain() {
  const path = usePathname();

  return (
    <SidebarContent>
      {navs.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.routes.map((nav) => (
                <SidebarMenuItem key={nav.label}>
                  <SidebarMenuButton
                    isActive={path == nav.route}
                    render={<Link href={nav.route}>{nav.label}</Link>}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
