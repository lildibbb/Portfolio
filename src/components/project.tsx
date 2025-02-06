"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import physioconnect from "@/assets/physioconnect.png";
const projects = [
  {
    title: "PhysioConnect",
    description:
      "An appointment booking and treatment monitoring system based on PWA. Designed for seamless scheduling, real-time updates, and efficient patient management.",

    dates: "2024 - Present",
    tags: [
      "React",
      "TypeScript",
      "Shadcn",
      "Tailwind CSS",
      "Bun.js",
      "Elysia.js",
      "Progressive Web App",
    ],
    image: physioconnect,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/yourusername/project1",
      },
      {
        icon: <Globe className="h-4 w-4" />,
        type: "Live Demo",
        href: "https://physioconnect.adibasyraaf.me/",
      },
    ],
  },
];

const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
);

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen ">
      <section className="container px-4 py-16 mx-auto space-y-12">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text  "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A collection of projects I have worked on, showcasing my expertise
            in{" "}
            <span className="font-semibold text-primary">
              full-stack development
            </span>{" "}
            and <span className="font-semibold text-primary">UI/UX design</span>
            .
          </motion.p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300 hover:shadow-xl"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTags([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
