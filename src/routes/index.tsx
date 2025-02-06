import { createFileRoute } from "@tanstack/react-router";
import { Docks } from "@/components/docks";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/hero";
import About from "@/components/about";
import Project from "@/components/project";

import { BackgroundLines } from "@/components/ui/background-lines";
import TechStack from "@/components/techstack";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <BackgroundLines className="min-h-screen">
      <div className="place-items-center">
        {/* <Header useRef  /> */}

        {/* Hero Section */}
        <Hero />

        <Separator />

        {/* About Section */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-16 px-4 items-start">
          <About />
          {/* Vertical Separator */}
          <div className="hidden md:block w-[2px] bg-border h-full mx-auto" />
          <TechStack />
        </div>

        <Separator />
        {/* Projects Section */}

        <Project />
        <Separator className="my-16" />
        {/* Floating Social Links */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <Docks />
        </div>
      </div>
    </BackgroundLines>
  );
}
