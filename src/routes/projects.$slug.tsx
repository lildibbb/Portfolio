"use client";

import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { getProjectBySlug } from "@/lib/projects";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Hash, ExternalLink, Github } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
});

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const CustomHeading = ({
  level,
  children,
}: {
  level: number;
  children?: React.ReactNode;
}) => {
  const text = React.Children.toArray(children).join("");
  const id = slugify(text);
  const Tag = `h${level}` as any;

  return (
    <Tag id={id} className="group relative scroll-mt-24">
      <a
        href={`#${id}`}
        className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-muted-foreground/50 hover:text-primary transition-colors"
        aria-label={`Link to section ${text}`}
      >
        <Hash className="w-4 h-4" />
      </a>
      {children}
    </Tag>
  );
};

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="container px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl font-bold">Project not found</h2>
        <p className="text-muted-foreground mt-2">
          The requested project could not be found.
        </p>
        <Button asChild className="mt-6">
          <a href="/">Back to Projects</a>
        </Button>
      </div>
    );
  }

  const toc = [
    { title: "Overview", id: "overview" },
    ...(project.wikiSections?.map((s) => ({ title: s.title, id: s.id })) || []),
  ];

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto max-w-4xl font-sans selection:bg-primary/20">
      <div className="mb-8 md:mb-12">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-2 mb-6 md:mb-8 text-muted-foreground hover:text-foreground"
        >
          <a href="/" className="flex items-center gap-1">
            ← Back to portfolio
          </a>
        </Button>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent break-words">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {project.tags.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="px-3 py-1 text-xs font-medium"
            >
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {project.links.map((link) => (
            <Button
              key={link.type}
              variant="outline"
              size="sm"
              asChild
              className=" px-4 border-muted-foreground/20 hover:bg-secondary"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                {link.type.toLowerCase().includes("github") ? (
                  <Github className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                {link.type}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Simplified TOC - Responsive */}
      {toc.length > 0 && (
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Contents
          </h2>
          <nav className="flex flex-col gap-1.5 border-l-2 border-border/50 pl-4">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-muted-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors text-sm md:text-base py-0.5 block"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      )}

      <Separator className="my-8 md:my-12 opacity-50" />

      <div className="space-y-16 md:space-y-24">
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24">
          <CustomHeading level={2}>Overview</CustomHeading>
          <article
            className="prose prose-neutral dark:prose-invert max-w-none 
                    prose-p:leading-7 md:prose-p:leading-8 prose-p:text-muted-foreground/90
                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                    prose-code:before:content-none prose-code:after:content-none
                    prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-secondary/80 prose-code:text-red-500/80 prose-code:font-mono prose-code:text-[0.85em]
                    prose-img:rounded-xl prose-img:shadow-xl prose-img:border prose-img:border-border/50 prose-img:w-full prose-img:h-auto
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-4 md:prose-h2:mb-6
                    prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 md:prose-h3:mt-12 prose-h3:mb-3 md:prose-h3:mb-4
                "
          >
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <CustomHeading level={2} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <CustomHeading level={3} {...props} />
                ),

                // Added image handling for responsiveness
                img: ({ node, alt, ...props }: any) => {
                  // If the alt text contains "smoll", make it small. Otherwise, full width.
                  const isSmoll = alt?.toLowerCase().includes("smoll");

                  return (
                    <img
                      {...props}
                      alt={alt}
                      className={`${
                        isSmoll ? "max-w-xs mx-auto" : "w-full"
                      } h-auto rounded-xl shadow-lg my-6 border border-border/50`}
                      loading="lazy"
                    />
                  );
                },
              }}
            >
              {project.content}
            </ReactMarkdown>
          </article>
        </section>

        {/* Dynamic Wiki Sections */}
        {project.wikiSections?.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 pt-8 md:pt-12 border-t border-border/30"
          >
            <article
              className="prose prose-neutral dark:prose-invert max-w-none 
                        prose-p:leading-7 md:prose-p:leading-8 prose-p:text-muted-foreground/90
                        prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-code:before:content-none prose-code:after:content-none
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-secondary/80 prose-code:text-red-500/80 prose-code:font-mono prose-code:text-[0.85em]
                        prose-img:rounded-xl prose-img:shadow-xl prose-img:border prose-img:border-border/50 prose-img:w-full prose-img:h-auto
                        prose-strong:text-foreground prose-strong:font-bold
                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-4 md:prose-h2:mb-6
                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 md:prose-h3:mt-12 prose-h3:mb-3 md:prose-h3:mb-4
                    "
            >
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <CustomHeading level={2} {...props} />
                  ), // Map H1 to H2 for consistency
                  h2: ({ node, ...props }) => (
                    <CustomHeading level={2} {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <CustomHeading level={3} {...props} />
                  ),
                  // Added image handling
                  img: ({ node, ...props }: any) => (
                    <img
                      {...props}
                      className="w-full h-auto rounded-xl shadow-lg my-6"
                      loading="lazy"
                    />
                  ),
                }}
              >
                {section.content}
              </ReactMarkdown>
            </article>
          </section>
        ))}
      </div>

      <div className="mt-24 md:mt-32 mb-12 md:mb-16 flex flex-col items-center gap-6">
        <Separator className="w-24 px-4 bg-muted-foreground/20" />
        <Button
          variant="ghost"
          asChild
          className="text-muted-foreground hover:text-foreground"
        >
          <a href="/">Return to portfolio home</a>
        </Button>
      </div>
    </div>
  );
}
