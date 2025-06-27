import { Breadcrumbs } from "./Breadcrumbs";
import { UserName } from "./UserName";
import { SidebarTrigger } from "./ui/sidebar";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-start gap-4 p-4">
      <SidebarTrigger />
      <div className="flex flex-1 justify-between items-center gap-4">
        <Breadcrumbs />
        <UserName />
      </div>
    </header>
  );
};