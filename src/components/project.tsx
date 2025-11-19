"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import physioconnect from "@/assets/physioconnect.png";
import smc_tradingview from "@/assets/smc_tradingview.png";
import movie_dex from "@/assets/movie_dex.png";

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
        href: "https://github.com/lildibbb/Physiotherapy-Treatment-Booking-System",
      },
      {
        icon: <Globe className="h-4 w-4" />,
        type: "Live Demo",
        href: "https://physioconnect.adibasyraaf.me/",
      },
    ],
  },
  {
    title: "SMC Multi-Timeframe TradingView",
    description:
      "Multi-timeframe TradingView Pine Script for Smart Money Concepts. Detects Fair Value Gaps, Order Blocks, Break of Structure, Market Structure Shifts, and Engulfing candles to generate high-probability confluence signals. Ideal for traders seeking precision in market structure analysis.",
    dates: "2025",
    tags: [
      "Pine Script",
      "TradingView",
      "Trading Strategy",
      "Technical Analysis",
      "Smart Money Concepts",
    ],
    image: smc_tradingview,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/lildibbb/smc-mtf-tradingview",
      },
    ],
  },
  {
    title: "MovieDex",
    description:
      "Movie platform to give ratings and reviews for watched movies",
    dates: "2024",
    tags: ["TypeScript", "React", "Laravel"],
    image: movie_dex,
    links: [
      {
        icon: <Github className="h-4 w-4" />,
        type: "GitHub",
        href: "https://github.com/kyziq/movie-dex-web-backend",
      },
    ],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen">
      <section className="container px-4 py-16 mx-auto space-y-12">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
