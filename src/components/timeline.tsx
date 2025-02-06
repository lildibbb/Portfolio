import { Timeline } from "@/components/ui/timeline";

const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Built and launched Aceternity UI and Aceternity UI Pro from scratch.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://assets.aceternity.com/templates/startup-1.webp"
            alt="startup template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-2.webp"
            alt="startup template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-3.webp"
            alt="startup template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-4.webp"
            alt="startup template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Early 2023",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Worked on multiple design projects and enhanced my frontend
          development skills.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="hero template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/features-section.png"
            alt="feature template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="bento template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/cards.png"
            alt="cards template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Changelog",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          Deployed 5 new components on Aceternity today.
        </p>
        <div className="mb-8">
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            <li>✅ Card grid component</li>
            <li>✅ Startup template Aceternity</li>
            <li>✅ Random file upload lol</li>
            <li>✅ Himesh Reshammiya Music CD</li>
            <li>✅ Salman Bhai Fan Club registrations open</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="hero template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/features-section.png"
            alt="feature template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="bento template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <img
            src="https://assets.aceternity.com/cards.png"
            alt="cards template"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
        </div>
      </div>
    ),
  },
];

const TimelineSection = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center mt-10 py-20 md:py-32 gap-10">
      {/* Left Section - Timeline */}
      <div className="text-center lg:text-start space-y-6">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            My Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            A timeline of my projects, milestones, and tech advancements.
          </p>
        </div>

        {/* Timeline Component */}
        <Timeline data={timelineData} />
      </div>

      {/* Right Section - Decorative Image */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-primary-foreground blur-md opacity-50" />
        <img
          src="/timeline-placeholder.jpg"
          alt="Timeline Illustration"
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-border"
        />
      </div>
    </section>
  );
};

export default TimelineSection;
