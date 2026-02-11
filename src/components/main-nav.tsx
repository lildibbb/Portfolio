"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

// --- NavDock Component (Desktop) ---
const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const NavDock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-[58px]  items-center gap-2 rounded-2xl border border-white/10 bg-white/10 dark:bg-black/10 px-4 backdrop-blur-md shadow-md",
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            mouseX: mouseX,
          } as any);
        }
        return child;
      })}
    </motion.div>
  );
};

const NavDockItem = ({
  mouseX,
  href,
  children,
  onClick,
}: {
  mouseX?: MotionValue<number>;
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-DEFAULT_DISTANCE, 0, DEFAULT_DISTANCE],
    [DEFAULT_SIZE * 2, DEFAULT_MAGNIFICATION * 2, DEFAULT_SIZE * 2],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ width }}
      className="relative flex items-center justify-center h-full px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/10 dark:hover:bg-white/5"
    >
      <span className="whitespace-nowrap">{children}</span>
    </motion.a>
  );
};

// --- MainNav Component ---
export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "/about", href: "/#about" },
    { name: "/projects", href: "/#projects" },
    { name: "/timeline", href: "/#timeline" },
    { name: "/techstack", href: "/#techstack" },
  ];

  return (
    <>
      {/* Desktop Navigation (Dock Style) */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center justify-center w-full max-w-2xl">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NavDock>
            {navItems.map((item) => (
              <NavDockItem key={item.name} href={item.href}>
                {item.name}
              </NavDockItem>
            ))}
          </NavDock>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 right-6 z-50 h-12 w-12 rounded-full border border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-md shadow-md flex items-center justify-center text-foreground "
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>

        {/* Full Screen Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-xl flex items-center justify-center"
            >
              <nav className="flex flex-col items-center gap-8 p-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-foreground/80 hover:text-foreground transition-colors tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
