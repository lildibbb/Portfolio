import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/yourusername",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com/yourusername",
    label: "Twitter",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:your@email.com",
    label: "Email",
  },
];

const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center mt-10 py-20 md:py-32 gap-10">
      {/* Left Section - Text & Social Links */}
      <div className="text-center lg:text-start space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight flex items-center justify-center lg:justify-start gap-4">
            Hi, I&apos;m Adib Asyraaf{" "}
            <span className="animate-wave inline-block">👋</span>
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl text-muted-foreground">
            <TypingAnimation className="text-cyan-800">
              Computer Science Student
            </TypingAnimation>
            <span className="text-primary">|</span>
            <span>Full Stack Developer</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center lg:justify-start gap-4">
          {socialLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Right Section - Profile Image */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-primary-foreground blur-md opacity-50" />
        <img
          src="/your-profile-image.jpg"
          alt="Profile"
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-border"
        />
      </div>
    </section>
  );
};

export default Hero;
