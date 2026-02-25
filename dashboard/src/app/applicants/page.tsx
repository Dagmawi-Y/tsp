"use client";

import { useEffect, useState } from "react";
import {
    Users,
    Search,
    Filter,
    ArrowUpDown,
    MoreHorizontal,
    Mail,
    Github,
    Linkedin,
    MessageCircle,
    ExternalLink,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function ApplicantsPage() {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        async function fetchApplicants() {
            setLoading(true);
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error(error);
            else setApplicants(data || []);
            setLoading(false);
        }

        fetchApplicants();
    }, []);

    const filteredApplicants = applicants.filter(app => {
        const matchesSearch =
            `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.telegram_username.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || app.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

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
                    <h1 className="text-4xl font-black tracking-tight font-display mb-1 text-foreground">Applicants.</h1>
                    <p className="text-muted-foreground font-medium text-lg">Manage and review potential Cohort 2 members.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted border border-border px-4 py-2">
                    <Users className="w-3 h-3 text-foreground" />
                    {filteredApplicants.length} Candidates Found
                </div>
            </div>

            <Card>
                <CardHeader className="border-b-0 pb-0">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search candidates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-muted border border-border font-bold uppercase text-[10px] tracking-widest focus:outline-none focus:border-foreground transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-muted p-1 border border-border">
                                {['all', 'pending', 'accepted', 'rejected'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(s)}
                                        className={cn(
                                            "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                                            filterStatus === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <button className="p-3 bg-muted border border-border hover:bg-foreground hover:text-background transition-all">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="pb-4 pt-0">
                                        <button className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors">
                                            Candidate <ArrowUpDown className="w-3 h-3" />
                                        </button>
                                    </th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Contact & Socials</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Hours/Week</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px]">Submission Date</th>
                                    <th className="pb-4 pt-0 font-black text-muted-foreground uppercase tracking-widest text-[10px] text-right">Review</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredApplicants.map((app) => (
                                    <tr key={app.id} className="group hover:bg-muted/30 transition-colors">
                                        <td className="py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground font-black text-lg bg-muted">
                                                    {app.first_name[0]}{app.last_name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-base leading-tight uppercase tracking-tight">{app.first_name} {app.last_name}</div>
                                                    <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">
                                                        {app.current_status}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <div className="flex gap-2">
                                                <a href={`mailto:${app.email}`} className="p-2 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                                <button className="p-2 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                    <MessageCircle className="w-4 h-4" />
                                                </button>
                                                {app.github_url && (
                                                    <a href={app.github_url} target="_blank" rel="noreferrer" className="p-2 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {app.linkedin_url && (
                                                    <a href={app.linkedin_url} target="_blank" rel="noreferrer" className="p-2 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                        <Linkedin className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <span className="px-3 py-1 border border-border font-black text-[10px] uppercase tracking-widest bg-muted">
                                                {app.hours_per_week} HRS
                                            </span>
                                        </td>
                                        <td className="py-5">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] font-black uppercase tracking-widest",
                                                app.status === 'accepted' ? "bg-foreground text-background border-foreground" :
                                                    app.status === 'rejected' ? "bg-muted text-muted-foreground border-border" :
                                                        "bg-background text-foreground border-border"
                                            )}>
                                                {app.status || 'pending'}
                                            </div>
                                        </td>
                                        <td className="py-5 text-sm font-medium text-muted-foreground">
                                            {format(new Date(app.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="py-5 text-right">
                                            <button className="p-3 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                        <p className="text-sm font-medium text-muted-foreground">
                            Showing 1 to {filteredApplicants.length} of {applicants.length} applicants
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
