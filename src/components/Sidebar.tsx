"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { keycloak } from "@/config/keycloak";
import { initialize } from "@/config/keycloak";
import { userInfoActions } from "@/redux/features/user-info";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Home, Banknote } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const menuItems = [
  { title: "Início", href: "/", icon: Home },
  { title: "Contracheque", href: "/contracheque", icon: Banknote },
];

export function AppSidebar() {
  const pathname = usePathname();

  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    initialize().then(() => {
      if (!keycloak.authenticated && userInfo.logged === "not-logged") {
        dispatch(userInfoActions.setLogged("logging"));
        keycloak.login();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!keycloak.authenticated && userInfo.logged === "logging") {
        dispatch(userInfoActions.setLogged("logging"));
        keycloak.login();
      }
    }, 1000);
    return () => clearInterval(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1>Painel de Administração</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
