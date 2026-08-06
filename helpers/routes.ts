import { RouteLink } from './utility';

export const routes = {
  login: '/auth/login',
  forgot: '/auth/forgot',
  home: '/dashboard/home',
  everification: '/dashboard/everification',
};

export function createRouteLinks(path: string): RouteLink[] {
  const segments = path.split('/').filter((x) => x !== '' && x !== 'home');
  return segments.map((x) => createRouteLink(x));
}

function createRouteLink(segment: string): RouteLink {
  switch (segment) {
    case 'everification':
      return { label: 'Everification', route: routes.everification };

    case 'dashboard':
      return { label: 'Home', route: routes.home };

    default:
      return { label: 'Unknown', route: '#' };
  }
}
