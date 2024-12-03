'use client';

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ParallaxHero from "@/components/hero/ParallaxHero";
import IE_web from "@/public/images/Screenshot_25-11-2024_17107_www.staging.bv.instantenergy.com.ng.jpeg";
import WANO_web from "@/public/images/Screenshot_25-11-2024_173147_www.wano.app.jpeg";
import IE_admin from "@/public/images/Screenshot_25-11-2024_18187_staging.admin.bv.instantenergy.com.ng.jpeg";
import WANO_app from "@/public/images/Screenshot_25-11-2024_182550_app.wano.app.jpeg";
import Image from "next/image";

// Project data remains the same
const projects = [
  {
    title: "Instant Energy BV website",
    description: "A modern web application built with React and Next.js, featuring dynamic content and smooth animations.",
    tech: ["React", "Next.js", "TypeScript"],
    image: IE_web.src,
    url: "https://www.staging.bv.instantenergy.com.ng/"
  },
  {
    title: "Instant Energy BV admin dashboard",
    description: "A modern web application built with React and Next.js, featuring dynamic content and smooth animations.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query"],
    image: IE_admin.src,
    url: "https://staging.admin.bv.instantenergy.com.ng/login"
  },
  {
    title: "Instant Energy BV Collect dashboard",
    description: "A modern web application built with React and Next.js, featuring dynamic content and smooth animations.",
    tech:   ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query"],
    image: IE_web.src,
    url: "https://www.staging.bv.instantenergy.com.ng/"
  },
  {
    title: "Wano Website",
    description: "Mobile-first design implementation with seamless user experience and real-time updates.",
    tech: ["React", "Next.js", "Node.js"],
    image: WANO_web.src,
    url: "https://www.wano.app/home"
  },
  {
    title: "Wano App Dashboard",
    description: "Full-featured e-commerce platform with secure payment processing and inventory management.",
    tech: ["React", "headless ui", "Redux", "Tailwind CSS"],
    image: WANO_app.src,
    url:  "https://app.wano.app/",
  },
  {
    title: "Project 4",
    description: "AI-powered application leveraging machine learning for intelligent data analysis.",
    tech: ["Python", "TensorFlow", "Flask"],
    image: "/project4.jpg",
    url:  "",
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [canExitProjects, setCanExitProjects] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollTime = useRef(Date.now());
  const scrollCooldown = 1000; // ms between scroll events

  // Check if projects section is in view
  const isProjectsInView = useInView(projectsRef, {
    margin: "-40% 0px -40% 0px",
    amount: "some"
  });

  const handleProjectTransition = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning) return;

    const newIndex = direction === 'next' ? currentProject + 1 : currentProject - 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    setIsTransitioning(true);
    setCurrentProject(newIndex);

    // Check if we can exit the projects section
    const canExit = (direction === 'next' && newIndex === projects.length - 1) ||
                   (direction === 'prev' && newIndex === 0);
    setCanExitProjects(canExit);

    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [currentProject, isTransitioning, projects.length]);

  // Handle scroll events
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let touchStartY = 0;
    let touchStartX = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) {
        e.preventDefault();
        return;
      }

      const direction = Math.sign(e.deltaY);
      setScrollDirection(direction > 0 ? 'down' : 'up');

      // If in projects section
      if (isProjectsInView) {
        // Check if we can exit the section
        if ((direction > 0 && currentProject === projects.length - 1 && canExitProjects) ||
            (direction < 0 && currentProject === 0 && canExitProjects)) {
          // Allow natural scroll
          return;
        }

        // Prevent default only if we're not allowing exit
        e.preventDefault();

        // Handle project navigation
        if (direction > 0 && currentProject < projects.length - 1) {
          handleProjectTransition('next');
        } else if (direction < 0 && currentProject > 0) {
          handleProjectTransition('prev');
        } else if (direction > 0 && currentProject === projects.length - 1) {
          // At last project, enable exit
          setCanExitProjects(true);
        } else if (direction < 0 && currentProject === 0) {
          // At first project, enable exit
          setCanExitProjects(true);
        }
      } else {
        // Reset exit permission when leaving projects section
        setCanExitProjects(false);
      }

      lastScrollTime.current = now;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isProjectsInView || isTransitioning) return;

      const touchEndY = e.touches[0].clientY;
      const touchEndX = e.touches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      // If horizontal swipe is more prominent
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        
        if (deltaX > 50 && currentProject < projects.length - 1) {
          handleProjectTransition('next');
        } else if (deltaX < -50 && currentProject > 0) {
          handleProjectTransition('prev');
        }
      } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
        // Vertical swipe
        if ((deltaY > 50 && currentProject === projects.length - 1) ||
            (deltaY < -50 && currentProject === 0)) {
          setCanExitProjects(true);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isProjectsInView, currentProject, canExitProjects, handleProjectTransition, isTransitioning, projects.length]);

  // Reset canExitProjects when leaving projects section
  useEffect(() => {
    if (!isProjectsInView) {
      setCanExitProjects(false);
    }
  }, [isProjectsInView]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory pb-4"
      style={{ scrollBehavior: isTransitioning ? 'auto' : 'smooth' }}
    >
      {/* Hero Section */}
      <section className="h-full snap-start snap-always bg-black text-white flex items-center justify-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4">AYOBAMI ADESINA</h1>
          <p className="text-xl text-gray-400">Frontend Engineer & Designer</p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="h-full snap-start snap-always bg-white text-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl p-8"
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg">
            Your compelling story and background goes here. Make it personal and engaging.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="h-full snap-start snap-always bg-gray-900 text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl p-8"
        >
          <h2 className="text-4xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-3 gap-6">
            {["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "MongoDB"].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-4 rounded-lg text-center"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section 
        ref={projectsRef}
        className="h-full snap-start snap-always bg-gray-900 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProject}
            initial={{ opacity: 0, x: scrollDirection === 'down' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: scrollDirection === 'down' ? -100 : 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Project Background */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${projects[currentProject].image})` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
              
              {/* Content Overlay */}
              <motion.div 
                className="absolute inset-0 bg-black/60 p-12 flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h3 
                  className="text-5xl font-bold text-white mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {projects[currentProject].title}
                </motion.h3>
                <motion.p 
                  className="text-xl text-white/90 max-w-2xl mb-8 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {projects[currentProject].description}
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-3 justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {projects[currentProject].tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/20 rounded-full text-white backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                <motion.div 
                  className="flex gap-4 mt-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <a href={projects[currentProject].url} target="_blank" rel="noopener noreferrer" className="bg-white/20 px-6 py-3 rounded-full text-white hover:bg-white/30 transition-all">
                    View Project
                  </a>
                  {/* <a href={projects[currentProject].github} target="_blank" rel="noopener noreferrer" className="bg-white/20 px-6 py-3 rounded-full text-white hover:bg-white/30 transition-all">
                    GitHub
                  </a> */}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-50">
          <div className="flex gap-4">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentProject === index ? 'bg-white' : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentProject(index);
                    setCanExitProjects(index === 0 || index === projects.length - 1);
                    setTimeout(() => setIsTransitioning(false), 1000);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-8 right-8 text-white/70 text-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {currentProject === projects.length - 1 && canExitProjects
            ? "Scroll down to continue"
            : currentProject === 0 && canExitProjects
            ? "Scroll up to previous section"
            : "Scroll to explore projects"}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="h-full snap-start snap-always bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-400">Let's create something amazing together</p>
        </motion.div>
      </section>
    </div>
  );
}
