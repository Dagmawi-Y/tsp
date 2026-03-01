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
    ChevronRight,
    X,
    Check,
    Ban,
    Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function ApplicantsPage() {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
    const [updating, setUpdating] = useState(false);

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

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdating(true);
        // Optimistic update
        const previousApplicants = [...applicants];
        setApplicants(applicants.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
        if (selectedApplicant?.id === id) {
            setSelectedApplicant({ ...selectedApplicant, status: newStatus });
        }

        const { error } = await supabase
            .from('applications')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
            setApplicants(previousApplicants); // Rollback
            alert('Failed to update status. Please try again.');
        }
        setUpdating(false);
    };

    const filteredApplicants = applicants.filter(app => {
        const matchesSearch =
            `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.telegram_username.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || (app.status || 'pending') === filterStatus;

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
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground font-black text-lg bg-muted shrink-0">
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
                                                <a href={`mailto:${app.email}`} title={app.email} className="p-2 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                                                    <Mail className="w-4 h-4" />
                                                </a>
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
                                            <button
                                                onClick={() => setSelectedApplicant(app)}
                                                className="p-3 border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all"
                                            >
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
                            Showing {filteredApplicants.length} of {applicants.length} applicants
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Applicant Detail Modal */}
            <AnimatePresence>
                {selectedApplicant && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedApplicant(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-border flex items-center justify-between bg-muted/30">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 border border-border flex items-center justify-center text-4xl font-black bg-background shrink-0">
                                        {selectedApplicant.first_name[0]}{selectedApplicant.last_name[0]}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
                                            {selectedApplicant.first_name} {selectedApplicant.last_name}
                                        </h2>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                                <Mail className="w-3 h-3" /> {selectedApplicant.email}
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                                <MessageCircle className="w-3 h-3" /> @{selectedApplicant.telegram_username}
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" /> {selectedApplicant.hours_per_week} HRS/WK
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedApplicant(null)}
                                    className="p-2 hover:bg-muted transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Application Narrative</h3>
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2">Project Vision</p>
                                                    <p className="text-sm font-medium leading-relaxed bg-muted/30 p-4 border border-border">
                                                        {selectedApplicant.project_description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2">Technical Challenges</p>
                                                    <p className="text-sm font-medium leading-relaxed bg-muted/30 p-4 border border-border">
                                                        {selectedApplicant.technical_challenge}
                                                    </p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="space-y-12">
                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Profile & Experience</h3>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {selectedApplicant.experience.map((exp: string) => (
                                                    <span key={exp} className="px-3 py-1 border border-border bg-foreground/5 text-foreground text-[10px] font-black uppercase tracking-widest">
                                                        {exp}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest mb-2">Motivation</p>
                                                <p className="text-sm font-medium leading-relaxed">
                                                    {selectedApplicant.why_join}
                                                </p>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Verification Links</h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                {selectedApplicant.github_url && (
                                                    <a href={selectedApplicant.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-border hover:bg-muted transition-colors group">
                                                        <span className="text-[10px] font-black uppercase tracking-widest">GitHub Repository</span>
                                                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                    </a>
                                                )}
                                                {selectedApplicant.linkedin_url && (
                                                    <a href={selectedApplicant.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-border hover:bg-muted transition-colors group">
                                                        <span className="text-[10px] font-black uppercase tracking-widest">LinkedIn Profile</span>
                                                        <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                    </a>
                                                )}
                                                {selectedApplicant.project_link && (
                                                    <a href={selectedApplicant.project_link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-border hover:bg-muted transition-colors group">
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Project Demo</span>
                                                        <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                    </a>
                                                )}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer - Actions */}
                            <div className="p-8 border-t border-border flex items-center justify-between bg-muted/30">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "px-4 py-2 border text-[10px] font-black uppercase tracking-widest",
                                        selectedApplicant.status === 'accepted' ? "bg-foreground text-background border-foreground" :
                                            selectedApplicant.status === 'rejected' ? "bg-muted text-muted-foreground border-border" :
                                                "bg-background text-foreground border-border"
                                    )}>
                                        Current Status: {selectedApplicant.status || 'pending'}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        disabled={updating || selectedApplicant.status === 'rejected'}
                                        onClick={() => updateStatus(selectedApplicant.id, 'rejected')}
                                        className="flex items-center gap-2 px-8 py-4 border border-border hover:bg-muted text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        <Ban className="w-4 h-4" />
                                        Reject
                                    </button>
                                    <button
                                        disabled={updating || selectedApplicant.status === 'accepted'}
                                        onClick={() => updateStatus(selectedApplicant.id, 'accepted')}
                                        className="flex items-center gap-2 px-8 py-4 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        <Check className="w-4 h-4" />
                                        Accept Application
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

