import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DockDemo } from "@/components/docks";
import { ProjectCard } from "@/components/ui/project-card";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import physioconnect from "@/assets/physioconnect.png";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { TimelineDemo } from "@/components/timeline";
import Hero from "@/components/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const projects = [
    {
      title: "PhysioConnect",
      description:
        "A comprehensive project management tool built with React and TypeScript. Features real-time updates, task tracking, and team collaboration tools.",
      dates: "2024 - Present",
      tags: [
        "React",
        "TypeScript",
        "Shadcn",
        "Tailwind CSS",
        "Bun.js",
        "Elysia.js",
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

  return (
    <div className="place-items-center">
      {/* Fullscreen Grid Pattern */}
      {/* <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "absolute inset-0 -z-10 w-full h-full opacity-30",
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      /> */}

      {/* Hero Section */}
      <Hero />
      <section className="relative">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8">
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
                Hi, I&apos;m Adib Asyraaf{" "}
                <span className="animate-wave inline-block">👋</span>
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-lg sm:text-xl text-muted-foreground">
                <TypingAnimation className="text-cyan-800">
                  Computer Science Student
                </TypingAnimation>
                <span className="text-primary">|</span>
                <span>Full Stack Developer</span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:scale-110 transition-transform"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-primary-foreground blur-md opacity-50" />

            <img
              src="/your-profile-image.jpg"
              alt="Profile"
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-border"
            />
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* About Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">About</h2>
        <Card className="p-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            At the end of 2022, I quit my job as a software engineer to go
            fulltime into building and scaling my own SaaS businesses. In the
            past,{" "}
            <a href="#" className="text-primary hover:underline">
              I pursued a double degree in computer science and business
            </a>
            ,{" "}
            <a href="#" className="text-primary hover:underline">
              interned at big tech companies in Silicon Valley
            </a>
            , and{" "}
            <a href="#" className="text-primary hover:underline">
              competed in over 21 hackathons for fun
            </a>
            . I also had the pleasure of being a part of the first ever
            in-person cohort of{" "}
            <a href="#" className="text-primary hover:underline">
              buildspace sf1
            </a>
            .
          </p>
        </Card>
      </section>
      <section className="space-y-8">
        <TimelineDemo />
      </section>

      <Separator className="my-16" />

      {/* Projects Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.tags}
              image={project.image}
              links={project.links}
            />
          ))}
        </div>
      </section>

      {/* Floating Social Links */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <DockDemo />
      </div>
    </div>
  );
}
