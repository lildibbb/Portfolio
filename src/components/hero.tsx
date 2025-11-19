import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, FileUser } from "lucide-react";

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
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center lg:text-left lg:flex-row container mx-auto px-6">
    
      <div className="space-y-6">
        <div className="space-y-4">
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className=" text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight flex items-center justify-center lg:justify-start gap-4"
          >
            Hi, I&apos;m Adib Asyraaf{" "}
          </motion.h1>

          <div className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl text-muted-foreground">
            <TypingAnimation className=" text-primary">
              Computer Science Student
            </TypingAnimation>
            <span className="text-primary">|</span>
            <span>Full Stack Developer</span>
          </div>
        </div>

       
        <div className="flex place-items-center justify-center lg:justify-start gap-4">
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
                {...(link.download ? { download: link.download } : {})} 
              >
                {link.icon}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
