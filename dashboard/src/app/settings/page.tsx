"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { Settings as SettingsIcon, Save, Globe, Shield, Bell, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
    const [isAppOpen, setIsAppOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            setLoading(true);
            const { data, error } = await supabase
                .from('settings')
                .select('value')
                .eq('key', 'isApplicationOpen')
                .single();

            if (!error && data) {
                setIsAppOpen(data.value === 'true' || data.value === true);
            }
            setLoading(false);
        }
        fetchSettings();
    }, []);

    const toggleAppStatus = async () => {
        setSaving(true);
        const newValue = !isAppOpen;
        const { error } = await supabase
            .from('settings')
            .upsert({ key: 'isApplicationOpen', value: newValue.toString() });

        if (!error) {
            setIsAppOpen(newValue);
        } else {
            console.error('Error updating setting:', error);
            alert('Failed to update settings. Make sure the "settings" table exists in Supabase.');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-foreground" />
            </div>
        );
    }

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
                            <CardTitle>Cohort Management</CardTitle>
                            <CardDescription>Control visibility and application status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-bold uppercase text-xs tracking-tight">Applications Open</p>
                                    <p className="text-xs text-muted-foreground">Allow new candidates to apply for Cohort 2.</p>
                                </div>
                                <button
                                    onClick={toggleAppStatus}
                                    disabled={saving}
                                    className={cn(
                                        "w-12 h-6 border transition-all relative",
                                        isAppOpen ? "bg-foreground border-foreground" : "bg-muted border-border"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-0.5 w-5 h-[18px] transition-all",
                                        isAppOpen ? "right-0.5 bg-background" : "left-0.5 bg-foreground/30"
                                    )} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between py-2 border-t border-border pt-4 opacity-50 cursor-not-allowed">
                                <div>
                                    <p className="font-bold uppercase text-xs tracking-tight">Public Waitlist</p>
                                    <p className="text-xs text-muted-foreground">Visible signup for individuals when apps are closed.</p>
                                </div>
                                <div className="w-12 h-6 bg-muted border border-border relative">
                                    <div className="absolute left-0.5 top-0.5 w-5 h-[18px] bg-foreground/20" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>General Configuration</CardTitle>
                            <CardDescription>Basic system-wide settings for the portal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 text-muted-foreground italic text-sm">
                            Additional general settings (Portal Name, Timezone) will be linked in the next update.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Utility for cn if not already in scope (it should be in dashboard but let's be safe)
import { cn } from "@/lib/utils";
