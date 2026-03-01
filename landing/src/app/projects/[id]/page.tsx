import { notFound } from "next/navigation";
import { allProjects } from "@/data/projects";
import ProjectDetail from "@/components/sections/ProjectDetailSection";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;

  // This is fine for static data
  const project = allProjects.find((p) => p.id === resolvedParams.id);

  if (!project) return notFound();

  return <ProjectDetail project={project} />;
}
