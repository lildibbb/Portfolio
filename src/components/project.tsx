"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { motion } from "framer-motion";

import projects from "@/lib/projects";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container px-4 py-20 mx-auto space-y-16 max-w-4xl">
        {/* Header */}
        <div className="space-y-4 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A collection of projects showcasing{" "}
            <span className="font-semibold text-foreground">
              full-stack development
            </span>
            ,{" "}
            <span className="font-semibold text-foreground">
              system architecture
            </span>
            , and{" "}
            <span className="font-semibold text-foreground">UI/UX design</span>.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
