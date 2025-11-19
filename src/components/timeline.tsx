import { Timeline } from "@/components/ui/timeline";

const timelineData = [
  {
    title: "March 2025 - June 2025",
    content: (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Software Intern
        </h3>
        <p className="text-sm text-primary font-medium mb-4">
          REVNOLOGY GROUP (M) SDN BHD • Petaling Jaya
        </p>
        <div className="space-y-3 mb-6">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Developed an internal task reminder system that improved task management efficiency by 30%, showcasing full-stack development capabilities.
          </p>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 text-xs md:text-sm space-y-1">
            <li>Enhanced UI and resolved bugs across Tazte food ordering app's merchant, admin, and user frontends</li>
            <li>Independently deployed production-ready internal tools</li>
            <li>Gained hands-on experience in full-stack development workflow</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "September 2022 - March 2023",
    content: (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Quality Assurance Tester Intern
        </h3>
        <p className="text-sm text-primary font-medium mb-4">
          UNIJAYA RESOURCES SDN BHD • Kuala Lumpur
        </p>
        <div className="space-y-3 mb-6">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Ensured bug-free deployments through comprehensive manual testing in an Agile environment, accelerating issue resolution by 30%.
          </p>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 text-xs md:text-sm space-y-1">
            <li>Prepared and executed UAT and FAT test cases with thoroughness</li>
            <li>Managed manual system testing and internal QA before client meetings</li>
            <li>Provided hands-on assistance during client UAT and FAT sessions</li>
            <li>Bridged communication between clients and developers for faster issue resolution</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Academic Journey",
    content: (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          Computer Science Student
        </h3>
        <p className="text-sm text-primary font-medium mb-4">
          Universiti Teknologi MARA (UiTM) • Expected Graduation: August 2025
        </p>
        <div className="space-y-3 mb-6">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Building expertise in full-stack development with focus on Next.js, NestJS, and modern web technologies.
          </p>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 text-xs md:text-sm space-y-1">
            <li>International Certificate of Digital Literacy (ICDL) - April 2025</li>
            <li>Awarded with Yayasan Telekom Malaysia Scholarship</li>
          </ul>
        </div>
      </div>
    ),
  },
];

const TimelineSection = () => {
  return (
    <section className="container mt-10 py-20 md:py-32">
    
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            My Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            From QA testing to full-stack development :V
          </p>
        </div>

       
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default TimelineSection;
