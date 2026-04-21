import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getProjects, ProjectData } from "../lib/firebase";

export default function Work() {
  const [pieces, setPieces] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjects();
        setPieces(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="pt-40 pb-20 px-6" ref={containerRef}>
      <main className="max-w-6xl mx-auto">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-accent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Curated Showcase</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 uppercase leading-[0.85]">Selected <br/> Projects</h1>
            <p className="text-secondary text-xl font-light max-w-lg mt-8 leading-relaxed">
              A record of technical explorations, architectural experiments, and software solutions built with algorithmic precision.
            </p>
          </motion.div>
        </header>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4 text-secondary">
            <Loader2 className="animate-spin" size={32} />
            <p className="font-mono text-[10px] uppercase tracking-widest">Gathering Artifacts...</p>
          </div>
        ) : pieces.length === 0 ? (
          <div className="py-40 border border-dashed border-black/10 dark:border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center px-10">
            <p className="text-2xl font-light text-secondary mb-2">The archive is currently empty.</p>
            <p className="text-sm text-secondary/60 font-mono tracking-wide">Sync with database to populate projects.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {pieces.map((piece, i) => (
              <ProjectCard key={piece.id} piece={piece} index={i} />
            ))}
          </div>
        )}

        <footer className="mt-40 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="font-mono text-[10px] uppercase tracking-widest">© 2024 Kelvin Wachira Portfolio</p>
          <p className="font-mono text-[10px] uppercase tracking-widest">NBO-GLOBAL / 04:45 PM EAT</p>
        </footer>
      </main>
    </div>
  );
}

function ProjectCard({ piece, index }: { piece: ProjectData; index: number; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1, 
        delay: (index % 2) * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group cursor-pointer"
    >
      <a 
        href={piece.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative block aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 shadow-2xl group/image"
      >
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={piece.image} 
          alt={piece.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 p-10 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
          <div className="flex justify-end">
            <div className="w-6 h-6 glass rounded-full flex items-center justify-center text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <ArrowUpRight size={10} />
            </div>
          </div>
          <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent mb-2 font-bold">In-Depth View</p>
            <p className="text-white text-[13px] font-light leading-relaxed max-w-xs">{piece.description || "Experimental digital artifact blending software engineering with aesthetic rigour."}</p>
          </div>
        </div>
      </a>

      <div className="flex justify-between items-start px-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3 block font-bold">{piece.type}</span>
          <h3 className="text-4xl font-bold tracking-tighter uppercase leading-none">{piece.title}</h3>
        </div>
        <div className="h-[1px] flex-grow mx-6 bg-black/5 dark:bg-white/5 mt-8 hidden lg:block" />
        <p className="font-mono text-[11px] text-secondary mt-2">PROJECT_{String(index + 1).padStart(2, '0')}</p>
      </div>
    </motion.div>
  );
}
