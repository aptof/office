import { routes } from '@/helpers/routes';
import { RouteLink } from '@/helpers/utility';
import BasicShell from '@/components/basic-shell';

export default function HomePage() {
  const links: RouteLink[] = [
    { route: routes.home, label: 'Home' },
    { route: 'other', label: 'Other' },
  ];
  return <BasicShell links={links}>Home</BasicShell>;
}
