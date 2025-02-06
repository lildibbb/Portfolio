import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
}

export function ProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  links,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{dates}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {links.map((link) => (
          <Button
            key={link.type}
            variant="outline"
            size="sm"
            className="gap-2"
            asChild
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
              {link.type}
            </a>
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
}
