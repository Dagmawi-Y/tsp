"use client";

import { useEffect, useState } from "react";
import {
    Users,
    Search,
    Mail,
    Download,
    Calendar,
    ChevronLeft,
    ChevronRight,
    AtSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { supabase } from "@/lib/supabase";
import { StatCard } from "@/components/StatCard";
import { format } from "date-fns";

export default function WaitlistPage() {
    const [waitlist, setWaitlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchWaitlist() {
            setLoading(true);
            const { data, error } = await supabase
                .from('waitlist')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error(error);
            else setWaitlist(data || []);
            setLoading(false);
        }

        fetchWaitlist();
    }, []);

    const filteredWaitlist = waitlist.filter(item =>
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-foreground/10 border-t-foreground animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight font-display mb-1">Waitlist.</h1>
                    <p className="text-muted-foreground font-medium text-lg">Interested individuals pending application opening.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-black uppercase tracking-widest text-[10px] border border-foreground hover:bg-background hover:text-foreground transition-all active:translate-y-0.5">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Interest" value={waitlist.length} icon={Users} color="primary" />
                <StatCard label="Today's Signups" value={waitlist.filter(w => format(new Date(w.created_at), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length} icon={Calendar} color="success" />
                <StatCard label="Contact Rate" value="0%" icon={Mail} color="info" />
            </div>

            <Card>
                <CardHeader className="flex flex-col md:flex-row gap-4 justify-between">
                    <div>
                        <CardTitle>Interest List</CardTitle>
                        <CardDescription>Direct emails of people waiting for Cohort 2.</CardDescription>
                    </div>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Filter by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-muted border border-border font-bold uppercase text-[10px] tracking-[0.2em] focus:outline-none focus:border-foreground transition-all"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Email Address</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Joined Date</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredWaitlist.map((item) => (
                                    <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 border border-border bg-muted">
                                                    <AtSign className="w-4 h-4 text-foreground" />
                                                </div>
                                                <span className="font-bold text-base uppercase tracking-tight">{item.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm font-medium text-muted-foreground italic">
                                            {format(new Date(item.created_at), 'MMMM do, yyyy')}
                                        </td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 border border-border text-[10px] font-black uppercase tracking-widest bg-muted text-foreground">
                                                New Interest
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <a href={`mailto:${item.email}`} className="p-3 inline-flex items-center justify-center border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                        <p className="text-sm font-medium text-muted-foreground">
                            {filteredWaitlist.length} subscribers found
                        </p>
                        <div className="flex gap-2">
                            <button disabled className="p-2 border border-border text-muted-foreground opacity-50 cursor-not-allowed">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button disabled className="p-2 border border-border text-muted-foreground opacity-50 cursor-not-allowed">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
