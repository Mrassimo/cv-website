import React, { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../constants';
import { Section } from '../ui/Section';
import { ChevronDownIcon, GithubIcon, EnvelopeIcon, LinkedinIcon } from '../ui/Icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NodeBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: any[] = [];
        const particleCount = 50;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() * 2 - 1) * 0.2;
                this.speedY = (Math.random() * 2 - 1) * 0.2;
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                if(!ctx) return;
                ctx.fillStyle = 'rgba(111, 194, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        init();

        const connect = () => {
            if(!ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        opacityValue = 1 - distance / 100;
                        ctx.strokeStyle = `rgba(111, 194, 255, ${opacityValue})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    return (
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 dark:opacity-20" />
    );
};


export const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Section id="home" ref={ref} className="text-center">
      <NodeBackground />
      <motion.div
        className="z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-h1 font-bold tracking-tight text-primary dark:text-primary-dark mb-8"
          variants={itemVariants}
        >
          {PERSONAL_INFO.name}
        </motion.h1>
        <motion.h2
          className="text-h2 font-secondary font-semibold text-secondary dark:text-secondary-dark mb-4"
          variants={itemVariants}
        >
          {PERSONAL_INFO.title}
        </motion.h2>
        <motion.p className="text-body text-secondary dark:text-secondary-dark mb-8" variants={itemVariants}>
          {PERSONAL_INFO.location} &bull; {PERSONAL_INFO.citizen}
        </motion.p>
        <motion.div className="flex flex-wrap justify-center items-center gap-16" variants={itemVariants}>
           <a
             href={`mailto:${PERSONAL_INFO.email}`}
             className="flex items-center gap-8 px-24 py-12 rounded-card bg-warm-cards dark:bg-warm-cards-dark hover:bg-warm-cards/80 dark:hover:bg-warm-cards-dark/80 transition-all duration-200 hover:shadow-card-hover text-primary dark:text-primary-dark font-semibold border border-overlay"
           >
             <EnvelopeIcon className="w-5 h-5" />
             <span className="hidden sm:inline">{PERSONAL_INFO.email}</span>
           </a>
           <a
             href={PERSONAL_INFO.linkedin}
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-8 px-24 py-12 rounded-card bg-accent text-white hover:bg-hover-accent transition-all duration-200 hover:shadow-card-hover font-semibold"
           >
             <LinkedinIcon className="w-5 h-5" />
             <span className="hidden sm:inline">LinkedIn</span>
           </a>
           <a
             href={PERSONAL_INFO.github}
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-8 px-24 py-12 rounded-card bg-warm-cards dark:bg-warm-cards-dark hover:bg-warm-cards/80 dark:hover:bg-warm-cards-dark/80 transition-all duration-200 hover:shadow-card-hover text-primary dark:text-primary-dark font-semibold border border-overlay"
           >
             <GithubIcon className="w-5 h-5" />
             <span className="hidden sm:inline">GitHub</span>
           </a>
        </motion.div>
      </motion.div>
      <a href="#about" className="absolute bottom-8 z-10 animate-bounce">
          <span className="sr-only">Scroll to next section</span>
          <ChevronDownIcon className="w-8 h-8 text-secondary/60 hover:text-accent transition-colors duration-200"/>
      </a>
    </Section>
  );
});

HeroSection.displayName = 'HeroSection';