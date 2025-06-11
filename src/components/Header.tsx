import { Breadcrumbs } from "./Breadcrumbs";
import { SidebarTrigger } from "./ui/sidebar";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-start gap-4 p-4">
      <SidebarTrigger />
      <Breadcrumbs />
    </header>
  );
};