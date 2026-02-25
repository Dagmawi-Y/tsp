"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { Settings as SettingsIcon, Save, Globe, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black tracking-tight font-display mb-1">Settings.</h1>
                <p className="text-muted-foreground font-medium text-lg">Manage your TSP admin portal preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { icon: Globe, label: "General", active: true },
                        { icon: Shield, label: "Security", active: false },
                        { icon: Bell, label: "Notifications", active: false },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-6 py-4 border border-border text-[10px] font-black uppercase tracking-widest transition-all ${item.active
                                    ? "bg-foreground text-background"
                                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Configuration</CardTitle>
                            <CardDescription>Basic system-wide settings for the portal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Portal Name</label>
                                <input
                                    type="text"
                                    defaultValue="TSP Admin Portal"
                                    className="w-full bg-muted border border-border px-4 py-3 font-bold uppercase text-[10px] tracking-widest focus:outline-none focus:border-foreground transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timezone</label>
                                <select className="w-full bg-muted border border-border px-4 py-3 font-bold uppercase text-[10px] tracking-widest focus:outline-none focus:border-foreground transition-all appearance-none cursor-pointer">
                                    <option>UTC (Standard)</option>
                                    <option>EST (Eastern Time)</option>
                                    <option>PST (Pacific Time)</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <button className="flex items-center gap-2 px-8 py-4 bg-foreground text-background font-black uppercase tracking-widest text-[10px] border border-foreground hover:bg-background hover:text-foreground transition-all">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cohort Management</CardTitle>
                            <CardDescription>Control visibility and application status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-bold uppercase text-xs tracking-tight">Applications Open</p>
                                    <p className="text-xs text-muted-foreground">Allow new candidates to apply for Cohort 2.</p>
                                </div>
                                <div className="w-12 h-6 bg-foreground border border-foreground relative cursor-pointer">
                                    <div className="absolute right-0.5 top-0.5 w-5 h-[18px] bg-background" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-2 border-t border-border pt-4">
                                <div>
                                    <p className="font-bold uppercase text-xs tracking-tight">Public Waitlist</p>
                                    <p className="text-xs text-muted-foreground">Visible signup for individuals when apps are closed.</p>
                                </div>
                                <div className="w-12 h-6 bg-muted border border-border relative cursor-pointer opacity-50">
                                    <div className="absolute left-0.5 top-0.5 w-5 h-[18px] bg-foreground/20" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
