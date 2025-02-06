"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TechItem {
  name: string;
  logo: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Other";
}

const techStack: TechItem[] = [
  {
    name: "React",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    level: "Advanced",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    level: "Advanced",
    category: "Frontend",
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    level: "Intermediate",
    category: "Backend",
  },
  {
    name: "Bun.js",
    logo: "https://bun.sh/logo.svg",
    level: "Advanced",
    category: "Backend",
  },
  {
    name: "Elysia.js",
    logo: "https://elysiajs.com/assets/elysia_v.webp",
    level: "Advanced",
    category: "Backend",
  },
  {
    name: "Tailwind CSS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    level: "Advanced",
    category: "Frontend",
  },
  {
    name: "PostgreSQL",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    level: "Advanced",
    category: "Database",
  },
  {
    name: "Git",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    level: "Advanced",
    category: "DevOps",
  },
  {
    name: "Laravel",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
    level: "Intermediate",
    category: "Backend",
  },
  {
    name: "Express.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    level: "Intermediate",
    category: "Backend",
  },
  {
    name: "Drizzle ORM",
    logo: "https://console.dev/img/favicons/orm.drizzle.team.jpg",
    level: "Intermediate",
    category: "Database",
  },
];

const levelColors = {
  Beginner: "bg-blue-500",
  Intermediate: "bg-green-500",
  Advanced: "bg-purple-500",
  Expert: "bg-orange-500",
};

export default function TechStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/50 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Tech Stack
          </h2>
          <p className="mt-4  text-lg text-muted-foreground">
            Technologies and tools I specialize in
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <TooltipProvider>
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="relative group">
                      <div className="relative p-6 flex flex-col items-center gap-4 transition-transform duration-300 transform hover:scale-105">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Logo */}
                        <div className="relative z-10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tech.logo || "/placeholder.svg"}
                            alt={`${tech.name} logo`}
                            className="w-12 h-12 object-contain filter group-hover:brightness-110"
                            loading="lazy"
                          />
                        </div>

                        {/* Name */}
                        <span className="text-sm font-medium text-center">
                          {tech.name}
                        </span>

                        {/* Level Indicator */}
                        <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full ${levelColors[tech.level]} transition-all duration-300 group-hover:opacity-100`}
                            style={{
                              width:
                                tech.level === "Expert"
                                  ? "100%"
                                  : tech.level === "Advanced"
                                    ? "75%"
                                    : tech.level === "Intermediate"
                                      ? "50%"
                                      : "25%",
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <p className="font-semibold">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tech.level} • {tech.category}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </TooltipProvider>
        </motion.div>
      </div>
    </div>
  );
}
