import { createFileRoute } from "@tanstack/react-router";
import { Docks } from "@/components/docks";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/hero";
import Project from "@/components/project";

import { BackgroundLines } from "@/components/ui/background-lines";
import TechStack from "@/components/techstack";
import Timeline from "@/components/timeline";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative">
      <BackgroundLines className="min-h-screen">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col gap-16 md:gap-24 relative z-10">
          <section id="about">
            <Hero />
          </section>

          <Separator />
          <section id="projects" className="scroll-mt-10">
            <Project />
          </section>

          <Separator className="my-8" />
          <section id="timeline" className="scroll-mt-10">
            <Timeline />
          </section>
          <Separator />
          <section id="techstack" className="scroll-mt-10">
            <div className="max-w-4xl mx-auto">
              <TechStack />
            </div>
          </section>

          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
            <Docks />
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}
