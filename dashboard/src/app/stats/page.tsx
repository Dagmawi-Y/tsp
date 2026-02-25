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

const data = [
    { name: "Week 1", count: 4 },
    { name: "Week 2", count: 12 },
    { name: "Week 3", count: 8 },
    { name: "Week 4", count: 18 },
    { name: "Week 5", count: 24 },
    { name: "Week 6", count: 32 },
];

const COLORS = ['#000000', '#262626', '#404040', '#525252', '#737373'];

export default function StatsPage() {
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
                    <span className="text-[10px] font-black uppercase tracking-widest">+18% vs Last Month</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Application Growth</CardTitle>
                        <CardDescription>Number of new applications received per week.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
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
                            <BarChart data={[
                                { name: "Pending", value: 12 },
                                { name: "Reviewed", value: 24 },
                                { name: "Interview", value: 8 },
                                { name: "Accepted", value: 4 },
                                { name: "Rejected", value: 6 }
                            ]}>
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
                                    {[0, 1, 2, 3, 4].map((entry, index) => (
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
