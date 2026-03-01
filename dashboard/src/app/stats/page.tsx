"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity } from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Cell
} from "recharts";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subDays, isSameDay } from "date-fns";
import { Loader2 } from "lucide-react";

export default function StatsPage() {
    const [loading, setLoading] = useState(true);
    const [growthData, setGrowthData] = useState<any[]>([]);
    const [statusData, setStatusData] = useState<any[]>([]);
    const [totalApps, setTotalApps] = useState(0);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            const { data, error } = await supabase
                .from('applications')
                .select('created_at, status');

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            setTotalApps(data.length);

            // Process Status Distribution
            const statuses = ['pending', 'accepted', 'rejected'];
            const distribution = statuses.map(s => ({
                name: s.charAt(0).toUpperCase() + s.slice(1),
                value: data.filter(a => (a.status || 'pending').toLowerCase() === s).length
            }));
            setStatusData(distribution);

            // Process Application Growth (Last 30 Days)
            const last30Days = eachDayOfInterval({
                start: subDays(new Date(), 30),
                end: new Date()
            });

            const growth = last30Days.map(day => {
                const count = data.filter(a => isSameDay(new Date(a.created_at), day)).length;
                return {
                    name: format(day, 'MMM d'),
                    count: count,
                    fullDate: day
                };
            });

            // Aggregate growth by week for a cleaner chart if needed, 
            // but daily for last 30 days is okay. Let's do daily but label sparingly.
            setGrowthData(growth);
            setLoading(false);
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-foreground" />
            </div>
        );
    }
    const COLORS = ['#000000', '#262626', '#404040', '#525252', '#737373'];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight font-display mb-1">Analytics.</h1>
                    <p className="text-muted-foreground font-medium text-lg">In-depth performance metrics for TSP Cohort 2.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-border bg-muted">
                    <Activity className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{totalApps} Total Candidates</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Application Growth</CardTitle>
                        <CardDescription>Daily applications received in the last 30 days.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#737373"
                                    fontSize={10}
                                    fontWeight="black"
                                    tickFormatter={(v) => v.toUpperCase()}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={6}
                                />
                                <YAxis
                                    stroke="#737373"
                                    fontSize={10}
                                    fontWeight="black"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '0px',
                                        fontSize: '10px',
                                        fontWeight: 'black'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#000000"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCount)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Status Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status Distribution</CardTitle>
                        <CardDescription>Overview of where candidates are in the pipeline.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#737373"
                                    fontSize={10}
                                    fontWeight="black"
                                    tickFormatter={(v) => v.toUpperCase()}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#737373"
                                    fontSize={10}
                                    fontWeight="black"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '0px',
                                        fontSize: '10px',
                                        fontWeight: 'black'
                                    }}
                                />
                                <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
