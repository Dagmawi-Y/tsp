"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    BarChart3,
    Users,
    Settings,
    ListTodo,
    LayoutDashboard,
    LogOut,
    ChevronRight
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Applicants", href: "/applicants", icon: Users },
    { name: "Waitlist", href: "/waitlist", icon: ListTodo },
    { name: "Stats", href: "/stats", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-card border-r border-border w-64">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden border border-border">
                        <Image
                            src="/assets/tsp-logo.jpg"
                            alt="TSP Logo"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter uppercase leading-none">TSP</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">Admin Portal</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center px-4 py-3 text-sm font-bold uppercase tracking-tight transition-all duration-200 border border-transparent",
                                isActive
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "mr-3 h-4 w-4 transition-colors",
                                isActive ? "text-background" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            {item.name}
                            {isActive && (
                                <ChevronRight className="ml-auto w-3 h-3" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex w-full items-center px-4 py-3 text-sm font-bold uppercase tracking-tight text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
