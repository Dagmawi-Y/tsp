import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-card border border-border overflow-hidden transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }: CardProps) {
    return (
        <div className={cn("px-6 py-5 border-b border-border bg-card/50", className)} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children, className, ...props }: CardProps) {
    return (
        <div className={cn("p-6", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className, ...props }: CardProps) {
    return (
        <h3 className={cn("text-lg font-black tracking-tight font-display", className)} {...props}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className, ...props }: CardProps) {
    return (
        <p className={cn("text-sm text-muted-foreground font-medium", className)} {...props}>
            {children}
        </p>
    );
}
