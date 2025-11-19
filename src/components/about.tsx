import Iphone15Pro from "./iphone-15-pro";
import { TypingAnimation } from "./ui/typing-animation";
import mockup from "@/assets/mockup.png";

const About = () => {
  return (
    <section className="container mx-auto px-4 mt-10 py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
     
        <div className="text-center md:text-left space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <TypingAnimation startOnView={true}> About Me</TypingAnimation>
            </h2>
            <p className="text-lg text-muted-foreground">
              I'm a 23-year-old undergraduate student currently pursuing a{" "}
              <span className="text-primary font-semibold">
                Bachelor of Computer Science (Hons.) in Netcentric Computing
              </span>
              . I love learning new technologies in{" "}
              <span className="text-primary font-semibold">
                web development
              </span>
              . I also have a strong interest in{" "}
              <span className="text-primary font-semibold">
                blockchain and cryptocurrency
              </span>
              .
            </p>
            <p className="text-lg text-muted-foreground">
              Outside of tech, I enjoy{" "}
              <span className="text-primary font-semibold">gaming</span> and{" "}
              <span className="text-primary font-semibold">
                hitting the gym
              </span>
              . I'm always looking for new challenges to expand my knowledge and
              improve my skills.
            </p>
          </div>
        </div>

       
        <div className="flex justify-center">
          <Iphone15Pro
            className="h-auto max-w-xs md:max-w-sm lg:max-w-md"
            src={mockup}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
