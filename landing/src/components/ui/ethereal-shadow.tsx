"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface EtherealShadowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "subtle" | "intense"
}

export function EtherealShadow({
  children,
  className,
  variant = "default",
  ...props
}: EtherealShadowProps) {
  const variants = {
    default: "shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.05)]",
    subtle: "shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(255,255,255,0.02)]",
    intense: "shadow-[0_0_80px_rgba(0,0,0,0.15)] dark:shadow-[0_0_80px_rgba(255,255,255,0.08)]"
  }

  return (
    <div
      className={cn(
        "relative h-full",
        variants[variant],
        "before:absolute before:inset-0 before:rounded-inherit before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-50 dark:before:from-white/5 dark:before:to-transparent",
        "after:absolute after:inset-0 after:rounded-inherit after:bg-gradient-to-tl after:from-black/5 after:to-transparent after:opacity-30 dark:after:from-white/10 dark:after:to-transparent",
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}