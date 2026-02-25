"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  Mail,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { format } from "date-fns";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    waitlistCount: 0,
    pendingReviews: 0,
    acceptanceRate: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // 1. Fetch Stats
      const [appsCount, waitlistCount] = await Promise.all([
        supabase.from('applications').select('*', { count: 'exact', head: true }),
        supabase.from('waitlist').select('*', { count: 'exact', head: true })
      ]);

      // 2. Fetch Recent Applications
      const { data: apps } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // 3. Process Status Data
      const { data: statusData } = await supabase
        .from('applications')
        .select('status');

      const pendingCount = statusData?.filter(a => !a.status || a.status === 'pending').length || 0;
      const acceptedCount = statusData?.filter(a => a.status === 'accepted').length || 0;
      const totalCount = statusData?.length || 0;
      const accRate = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;

      // 4. Process Experience Data
      const { data: allApps } = await supabase
        .from('applications')
        .select('experience');

      const expCounts: Record<string, number> = {};
      allApps?.forEach(app => {
        app.experience.forEach((exp: string) => {
          expCounts[exp] = (expCounts[exp] || 0) + 1;
        });
      });

      const formattedExpData = Object.entries(expCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
      })).sort((a, b) => b.value - a.value);

      setStats({
        totalApplications: appsCount.count || 0,
        waitlistCount: waitlistCount.count || 0,
        pendingReviews: pendingCount,
        acceptanceRate: accRate,
      });
      setRecentApplications(apps || []);
      setExperienceData(formattedExpData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    );
  }

  const COLORS = ['#000000', '#262626', '#404040', '#525252', '#737373'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black tracking-tight font-display mb-1">Overview.</h1>
        <p className="text-muted-foreground font-medium">Monitoring Cohort 2 applications and growth.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Applications"
          value={stats.totalApplications}
          icon={Users}
          trend={{ value: 12, isUp: true }}
          color="primary"
        />
        <StatCard
          label="Waitlist Count"
          value={stats.waitlistCount}
          icon={Mail}
          trend={{ value: 5, isUp: true }}
          color="success"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews}
          icon={Clock}
          color="warning"
        />
        <StatCard
          label="Acceptance Rate"
          value={`${stats.acceptanceRate}%`}
          icon={CheckCircle2}
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Experience Distribution</CardTitle>
            <CardDescription>Breakdown of applicant specializations.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experienceData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis
                  dataKey="name"
                  stroke="#737373"
                  fontSize={12}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#737373"
                  fontSize={12}
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    color: '#000000'
                  }}
                  itemStyle={{ color: '#000000' }}
                />
                <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                  {experienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specialization Mix</CardTitle>
            <CardDescription>Proportional breakdown.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={experienceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {experienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    color: '#000000'
                  }}
                  itemStyle={{ color: '#000000' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>The latest members seeking to join Cohort 2.</CardDescription>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-foreground hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pt-0 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Name</th>
                  <th className="pb-4 pt-0 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Email</th>
                  <th className="pb-4 pt-0 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Specialization</th>
                  <th className="pb-4 pt-0 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Submitted</th>
                  <th className="pb-4 pt-0 font-bold text-muted-foreground uppercase tracking-widest text-[10px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-4">
                      <div className="font-bold">{app.first_name} {app.last_name}</div>
                      <div className="text-xs text-muted-foreground font-medium italic">@{app.telegram_username}</div>
                    </td>
                    <td className="py-4 text-sm font-medium">{app.email}</td>
                    <td className="py-4">
                      <div className="flex gap-1 flex-wrap">
                        {app.experience.slice(0, 2).map((exp: string) => (
                          <span key={exp} className="px-2 py-0.5 border border-border bg-foreground/5 text-foreground text-[9px] font-black uppercase tracking-widest">
                            {exp}
                          </span>
                        ))}
                        {app.experience.length > 2 && (
                          <span className="px-2 py-0.5 border border-border bg-muted text-muted-foreground text-[9px] font-black uppercase tracking-widest">
                            +{app.experience.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground font-medium">
                      {format(new Date(app.created_at), 'MMM d, h:mm a')}
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
