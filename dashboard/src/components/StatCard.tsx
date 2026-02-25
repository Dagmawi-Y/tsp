import { Card, CardContent } from "@/components/Card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isUp: boolean;
    };
    color?: "primary" | "success" | "warning" | "info";
}

const colorMap = {
    primary: "bg-foreground/5 text-foreground",
    success: "bg-foreground/5 text-foreground",
    warning: "bg-foreground/5 text-foreground",
    info: "bg-foreground/5 text-foreground",
};

export function StatCard({ label, value, icon: Icon, trend, color = "primary" }: StatCardProps) {
    return (
        <Card className="hover:translate-y-[-2px] transition-transform">
            <CardContent className="flex items-center gap-5">
                <div className={cn("p-4 border border-border", colorMap[color])}>
                    <Icon className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-black tracking-tight">{value}</h2>
                        {trend && (
                            <span className={cn(
                                "text-[10px] font-black px-1.5 py-0.5 border border-border",
                                trend.isUp ? "text-foreground bg-foreground/5" : "text-muted-foreground bg-muted"
                            )}>
                                {trend.isUp ? "+" : "-"}{Math.abs(trend.value)}%
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
