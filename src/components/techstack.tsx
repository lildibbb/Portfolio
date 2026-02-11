"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Types ---
type Category = "Frontend" | "Backend" | "Database" | "DevOps";

interface TechItem {
  name: string;
  logo: string;
  category: Category;
}

// --- Data ---
const techStack: TechItem[] = [
  // Frontend
  {
    name: "React",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "Next.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
  },
  {
    name: "Tanstack",
    logo: "https://tanstack.com/images/logos/logo-color-banner-600.png",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frontend",
  },
  {
    name: "Redux",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
    category: "Frontend",
  },
  {
    name: "PWA",
    logo: "https://cdn.jsdelivr.net/gh/webmaxru/progressive-web-apps-logo/pwalogo.svg",
    category: "Frontend",
  },

  // Backend
  {
    name: "NestJS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-original.svg",
    category: "Backend",
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  {
    name: "Bun.js",
    logo: "https://bun.sh/logo.svg",
    category: "Backend",
  },
  {
    name: "Elysia.js",
    logo: "https://elysiajs.com/assets/elysia_v.webp",
    category: "Backend",
  },
  {
    name: "BullMQ",
    logo: "https://user-images.githubusercontent.com/95200/64285204-99c04900-cf5b-11e9-925c-4743006ce420.png",
    category: "Backend",
  },
  {
    name: "Keyv",
    logo: "https://avatars.githubusercontent.com/u/35213565?s=200&v=4",
    category: "Backend",
  },
  {
    name: "Laravel",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
    category: "Backend",
  },
  {
    name: "Express.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    category: "Backend",
  },

  // Database
  {
    name: "PostgreSQL",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    category: "Database",
  },
  {
    name: "Redis",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
    category: "Database",
  },
  {
    name: "TypeORM",
    logo: "https://user-images.githubusercontent.com/62142146/208088732-e168fd64-3e48-4f48-b14d-9d91fa7d99f6.svg",
    category: "Database",
  },
  {
    name: "Drizzle",
    logo: "https://avatars.githubusercontent.com/u/108468352?v=4",
    category: "Database",
  },

  {
    name: "Docker",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    category: "DevOps",
  },
  {
    name: "GitHub Actions",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    category: "DevOps",
  },
  {
    name: "Git",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    category: "DevOps",
  },
  {
    name: "Cloudflare Tunnel",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cloudflare/cloudflare-original.svg",
    category: "DevOps",
  },
  {
    name: "Nginx",
    logo: "https://avatars.githubusercontent.com/u/8629072?s=280&v=4",
    category: "DevOps",
  },
  {
    name: "PM2",
    logo: "https://raw.githubusercontent.com/Unitech/pm2/master/pres/pm2-v4.png",
    category: "DevOps",
  },
];

const categories: Category[] = ["Frontend", "Backend", "Database", "DevOps"];

export default function TechStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            The technologies fueling my development workflow.
          </motion.p>
        </div>

        {/* Content */}
        <div ref={ref} className="space-y-16">
          {categories.map((category, catIndex) => {
            const items = techStack.filter(
              (item) => item.category === category,
            );

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                className="space-y-6"
              >
                {/* Category Title */}
                <h3 className="text-2xl font-semibold text-foreground border-l-4 border-primary pl-4">
                  {category}
                </h3>

                {/* Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 sm:gap-10">
                  {items.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center gap-3 group"
                    >
                      {/* Logo - Plain, no background */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-full h-full object-contain drop-shadow-sm"
                          loading="lazy"
                        />
                      </div>

                      {/* Label */}
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
