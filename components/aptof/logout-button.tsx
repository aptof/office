'use client';
import { authClient } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { routes } from '@/helpers/routes';
import { useState } from 'react';
import { Spinner } from '../ui/spinner';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  async function logout() {
    setIsLoading(true);
    await authClient.signOut();
    setIsLoading(false);
    router.push(routes.login);
  }

  return (
    <Button onClick={logout} disabled={isLoading}>
      {isLoading ? <Spinner /> : 'Logout'}
    </Button>
  );
}
