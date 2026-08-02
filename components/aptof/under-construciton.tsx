'use client';
import { routes } from '@/helpers/routes';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnderConstruction() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-bold mb-4">🚧 Under Construction 🚧</CardTitle>
        <p className="text-lg text-gray-600 mb-6">
          We’re working hard to bring you something amazing. Please check back soon!
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4 w-full">
          <Button className="grow" onClick={() => router.back()}>
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
          <Button variant="secondary" className="grow" onClick={() => router.push(routes.home)}>
            <Home className="mr-2" />
            Go Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
