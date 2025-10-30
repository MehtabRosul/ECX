'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Grid, 
  GitBranch, 
  BarChart3, 
  Settings, 
  Star,
  GitCompare
} from "lucide-react";

const navItems = [
  { id: "overview", name: "Overview", href: "/products", icon: Grid },
  { id: "compare", name: "Compare", href: "/products/compare", icon: GitCompare },
  { id: "analytics", name: "Analytics", href: "/products/analytics", icon: BarChart3 },
  { id: "reviews", name: "Reviews", href: "/products/reviews", icon: Star },
];

export function ProductsNav() {
  const pathname = usePathname();
  
  // Extract the current section from the pathname
  const getCurrentSection = () => {
    if (pathname === "/products") return "overview";
    if (pathname.includes("/compare")) return "compare";
    if (pathname.includes("/analytics")) return "analytics";
    if (pathname.includes("/reviews")) return "reviews";
    return "overview";
  };
  
  const currentSection = getCurrentSection();
  
  return (
    <div className="mb-8 overflow-x-auto sm:overflow-visible">
      <div className="mx-auto flex flex-wrap justify-center gap-0.5 sm:gap-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <motion.div
              key={item.id}
              className="relative"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {!isActive && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-primary/10 blur opacity-0"
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                />
              )}
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "group whitespace-nowrap transition-colors px-0 h-8 sm:h-10 rounded-xl",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-surface-2 hover:border-primary/30 hover:text-foreground"
                )}
                asChild
              >
                <Link href={item.href} className="relative z-10 px-1.5 py-1 sm:px-3 sm:py-2 text-[11px] sm:text-sm">
                  <Icon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="align-middle">{item.name}</span>
                </Link>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}