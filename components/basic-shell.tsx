'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { createRouteLinks } from '@/helpers/routes';
import { RouteLink } from '@/helpers/utility';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function BasicShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const links: RouteLink[] = createRouteLinks(path);

  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2" />
          <Breadcrumbs links={links} />
        </div>
      </header>
      <div className="m-4">{children}</div>
    </SidebarInset>
  );
}

function Breadcrumbs({ links }: { links: RouteLink[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((item, index) => {
          const isLast = index === links.length - 1;

          return (
            <React.Fragment key={item.route}>
              <BreadcrumbItem className={index === 0 ? 'hidden md:block' : ''}>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={item.route} />}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Render separator only if it's not the last item */}
              {!isLast && <BreadcrumbSeparator className={index === 0 ? 'hidden md:block' : ''} />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
