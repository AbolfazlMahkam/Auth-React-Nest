import { NavLink } from "react-router-dom";
import { Home, Users, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    roles: ["user", "admin", "super_admin"],
  },
  {
    to: "/users",
    label: "Users",
    icon: Users,
    roles: ["admin", "super_admin"],
  },
];

export function Sidebar() {
  const { user } = useAuth();

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role || "user"),
  );

  return (
    <aside className="w-64 border-r bg-background flex flex-col h-full hidden md:flex">
      <div className="p-6 h-[74px]">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
      </div>
      <Separator />
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground hover:translate-x-1",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium shadow-sm"
                      : "text-muted-foreground",
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">
          Designed and developed by{" "}
          <a
            className="hover:text-[#623fa6] hover:text-[13px] font-bold duration-300"
            href="https://github.com/AbolfazlMahkam"
          >
            a.mahkam.950
          </a>
        </p>
      </div>
    </aside>
  );
}
