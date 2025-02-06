"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Download, Github, Linkedin, Mail, Menu } from "lucide-react";

interface HeaderProps {
  scrollToSection: (section: string) => void;
}

export function Header({ scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const routes = [
    { label: "Home", section: "home" },
    { label: "About", section: "about" },
    { label: "Projects", section: "projects" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <span className="mr-6 flex items-center space-x-2 font-bold text-xl">
            John Doe
          </span>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <button
                key={route.section}
                onClick={() => scrollToSection(route.section)}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {route.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation - Side Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <span className="font-bold">John Doe</span>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <button
                    key={route.section}
                    onClick={() => {
                      scrollToSection(route.section);
                      setIsOpen(false);
                    }}
                    className="text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {route.label}
                  </button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Social Icons */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:your@email.com">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
