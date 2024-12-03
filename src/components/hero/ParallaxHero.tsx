'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import  useMouse  from '@react-hook/mouse-position';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ParallaxHero({ title, subtitle, description }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  // Smooth spring physics for scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
  });

  // Parallax effects based on scroll
  const y = useParallax(smoothProgress, 100);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Mouse parallax values
  const mouseX = mouse.x ?? 0;
  const mouseY = mouse.y ?? 0;
  const centerX = mouse.elementWidth ? mouse.elementWidth / 2 : 0;
  const centerY = mouse.elementHeight ? mouse.elementHeight / 2 : 0;

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background/10 to-background/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              x: useTransform(
                smoothProgress,
                [0, 1],
                [0, (mouseX - centerX) * 0.1]
              ),
              y: useTransform(
                smoothProgress,
                [0, 1],
                [0, (mouseY - centerY) * 0.1]
              ),
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8"
        style={{ y, scale, opacity }}
      >
        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-primary font-medium tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.5], [0, 0.5]),
        }}
      />
    </motion.div>
  );
}
