import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/lib/timeline";

const TimelineSection = () => {
  return (
    <section className="container mt-10 py-20 md:py-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My path from Quality Assurance to Full-Stack Engineering :V
          </p>
        </div>

        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default TimelineSection;
