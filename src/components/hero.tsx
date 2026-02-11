import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Github, Linkedin, Twitter, Mail, FileUser } from "lucide-react";
import Iphone15Pro from "./iphone-15-pro";
import mockup from "@/assets/mockup.png";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/lildibbb",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/adib-asyraaf/",
    label: "LinkedIn",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://x.com/adbsyrff",
    label: "Twitter",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:adib.asyraaf760@gmail.com",
    label: "Email",
  },
  {
    icon: <FileUser className="h-5 w-5" />,
    href: "/a.pdf",
    label: "Download Resume",
    download: "Adib_Asyraaf_Resume.pdf",
  },
];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const jobTitleRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state set hidden in CSS or via .set here
      gsap.set(
        [
          nameRef.current,
          jobTitleRef.current,
          socialRef.current,
          bioRef.current,
        ],
        {
          y: 50,
          opacity: 0,
        },
      );

      gsap.set(imageRef.current, {
        x: 100,
        opacity: 0,
        rotationY: 15,
      });

      // Animate Image
      tl.to(imageRef.current, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "power2.out",
      })
        // Animate Text Content Staggered
        .to(
          [
            nameRef.current,
            jobTitleRef.current,
            socialRef.current,
            bioRef.current,
          ],
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
          },
          "-=1.0", // Overlap with image animation
        );

      // Add a subtle floating animation to the image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center lg:items-center pt-20 lg:pt-0"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-4">
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight opacity-0"
            >
              Hi, I&apos;m Adib Asyraaf
            </h1>

            <div
              ref={jobTitleRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl text-muted-foreground opacity-0"
            >
              <TypingAnimation className="text-primary text-lg font-medium">
                Computer Science Graduate
              </TypingAnimation>
              <span className="hidden sm:inline text-muted-foreground/50">
                |
              </span>
              <span className="text-lg">Full Stack Developer</span>
            </div>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="flex items-center gap-3 opacity-0">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform rounded-full hover:bg-primary/10"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  download={link.download}
                >
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>

          {/* Bio Text (Merged from About) */}
          <div
            ref={bioRef}
            className="space-y-4 max-w-xl text-muted-foreground text-base sm:text-lg leading-relaxed opacity-0"
          >
            <p>
              I&apos;m a{" "}
              <span className="text-primary font-medium">
                24-year-old CS grad
              </span>{" "}
              who spent the last few years deep-diving into Netcentric
              Computing. These days, I spend most of my time building and
              breaking things in the{" "}
              <span className="text-primary font-medium">web dev</span> world.
              I&apos;ve also got a massive interest in the{" "}
              <span className="text-primary font-medium">
                blockchain and crypto
              </span>{" "}
              space—basically anything that pushes the boundaries of how we use
              the internet.
            </p>
            <p>
              When I&apos;m not staring at a terminal, you&apos;ll probably find
              me <span className="text-primary font-medium">gaming</span> to
              clear my head. Always down for a new challenge or a chance to
              learn something that actually makes an impact.
            </p>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div
          ref={imageRef}
          className="flex justify-center items-center order-1 lg:order-2 opacity-0 perspective-1000"
        >
          <Iphone15Pro
            className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] h-auto drop-shadow-2xl"
            src={mockup}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
