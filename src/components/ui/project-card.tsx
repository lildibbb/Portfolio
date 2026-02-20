import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import type { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  dates: string;
  tags: string[];
  image: string;
  links: {
    icon: ReactNode;
    type: string;
    href: string;
  }[];
  slug?: string;
}

export function ProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  links,
  slug,
}: ProjectCardProps) {
  const CardContentWrapper = ({ children }: { children: ReactNode }) => {
    if (slug) {
      return (
        <Link to="/projects/$slug" params={{ slug }} className="block">
          {children}
        </Link>
      );
    }
    return <div className="block">{children}</div>;
  };

  return (
    <div className="group">
      <CardContentWrapper>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted self-start">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {slug && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-background/90 backdrop-blur-sm text-foreground px-5 py-2 rounded-full font-medium text-sm shadow-lg">
                  View Details →
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-semibold">
                {dates}
              </p>
            </div>

            <p className="text-foreground/80 leading-relaxed">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2">
              {links.map((link) => (
                <Button
                  key={link.type}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    {link.type}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContentWrapper>
    </div>
  );
}
