'use client'
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = pathname.split('/').filter(Boolean);

  const breadcrumbItems = breadcrumbs.map((breadcrumb, index) => {
    const href = `/${breadcrumbs.slice(0, index + 1).join('/')}`;

    return (
      <React.Fragment key={breadcrumb}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={href} className="">{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}</BreadcrumbLink>
        </BreadcrumbItem>
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};