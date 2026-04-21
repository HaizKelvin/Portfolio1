import { motion } from "motion/react";
import { ArrowRight, Sparkles, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-32 pb-20 px-6">
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        {/* Header Section */}
        <div className="mb-24">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(0,112,243,0.8)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent font-bold">Computer Science Student</span>
            </div>
            
            <h1 className="text-5xl md:text-[12vw] lg:text-[10vw] font-black leading-[0.9] tracking-tight mb-10 uppercase">
              Kelvin <br /> Wachira<span className="text-accent italic font-serif">.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-12">
              <p className="text-2xl md:text-3xl font-light text-secondary leading-tight max-w-lg">
                Computer Science student and developer architecting high-performance digital systems and creative interfaces.
              </p>
              
              <div className="flex flex-col gap-8 md:items-end">
                <div className="flex flex-col gap-2 md:items-end">
                  <div className="flex items-center gap-2 text-secondary font-mono text-[11px] uppercase tracking-widest">
                    <MapPin size={12} />
                    <span>Nairobi, Kenya</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-mono text-[11px] uppercase tracking-widest">
                    <Globe size={12} />
                    <span>Remote Worldwide</span>
                  </div>
                </div>
                
                <Link to="/contact" className="group flex items-center gap-4 hover:text-accent transition-colors">
                  <span className="text-lg font-bold uppercase tracking-widest">Start a project</span>
                  <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Status Bar */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 p-8 glass rounded-[2.5rem] font-mono text-[9px] uppercase tracking-wider flex flex-wrap gap-x-12 gap-y-6 text-secondary/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Core: 7.2.4-STABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Architecture: x86_64_ARM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Latency: 14ms (RTT)</span>
          </div>
          <div className="hidden md:block opacity-30">
            [SYS_INIT_SEQUENCE_SUCCESSFUL]
          </div>
        </motion.div>

        {/* Feature Image Section */}
        <motion.div
          variants={itemVariants}
          className="relative group rounded-[2.5rem] overflow-hidden aspect-[4/5] md:aspect-[21/9] mb-32 shadow-2xl bg-neutral-900 border border-black/5 dark:border-white/5"
        >
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src="https://i.ibb.co/kVymcLrz/file-00000000b4ec71f6bb90c70e1e37911c.png" 
            alt="Kelvin Wachira Portrait" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="absolute bottom-10 left-10 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-accent" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80 font-bold">Identity & Vision</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9]">Digital Architect & <br/> Creative Thinker</h2>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 rounded-[2.5rem] overflow-hidden border border-black/10 dark:border-white/10 shadow-xl"
        >
          {[
            { tag: "Software", title: "Technical Systems", desc: "Developing robust software solutions with a focus on data structures and algorithms." },
            { tag: "Web", title: "Full-Stack Engineering", desc: "Building scalable, accessible, and fast web applications using modern frameworks." },
            { tag: "Theory", title: "Algorithmic Design", desc: "Applying computational principles to solve complex real-world logic problems." }
          ].map((item, i) => (
            <div 
              key={item.tag}
              className="p-12 bg-white dark:bg-black hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors group cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/5 dark:bg-accent/10 border border-accent/10 dark:border-accent/20 flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <span className="font-mono text-[7px] font-bold text-accent group-hover:text-white uppercase">{item.tag[0]}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase leading-none">{item.title}</h3>
              <p className="text-secondary font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <footer className="mt-40 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-widest">© 2024 Kelvin Wachira Portfolio</p>
            <div className="flex gap-4 font-mono text-[9px] uppercase tracking-[0.2em]">
              <a href="https://github.com/kelvinwachira" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Github</a>
              <a href="https://linkedin.com/in/kelvinwachira" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="font-mono text-[10px] hover:text-accent transition-colors opacity-50 hover:opacity-100">
              BUILD_REF: 0x7F4B2
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-widest tracking-widest">NBO-GLOBAL / 04:45 PM EAT</p>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}
