import { motion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Sparkles, MapPin, Globe, Cpu, Layers, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="min-h-screen flex flex-col pt-32 pb-20 px-6 overflow-hidden">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[200] origin-left"
        style={{ scaleX }}
      />
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        {/* Header Section */}
        <div className="mb-24 relative">
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-base bg-accent/20 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-accent opacity-20 animate-pulse" />
                  </div>
                ))}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-black">System_Active // ID: PORTFOLIO_V4</span>
            </div>
            
            <h1 className="text-6xl md:text-[14vw] lg:text-[12vw] font-black leading-[0.85] tracking-tight mb-14 uppercase">
              Kelvin <br /> 
              <span className="flex items-center gap-6">
                Wachira<span className="text-accent italic font-serif">.</span>
                <div className="hidden lg:block w-32 h-[2px] bg-accent/20 flex-shrink-0" />
              </span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-12">
              <div className="md:col-span-7">
                <p className="text-2xl md:text-4xl font-light text-primary leading-[1.1] tracking-tight mb-10">
                  Engineering <span className="font-medium">high-performance</span> digital systems & creative interfaces through the lens of Computer Science.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Architecture", "Systems", "AI Integration", "Full-Stack"].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-secondary group-hover:border-accent transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-5 flex flex-col gap-10 md:items-end">
                <div className="space-y-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-secondary font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="opacity-40">Current Location:</span>
                    <MapPin size={12} className="text-accent" />
                    <span className="font-bold">Nairobi, KE</span>
                  </div>
                  <div className="flex items-center justify-end gap-3 text-secondary font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="opacity-40">Availability:</span>
                    <Globe size={12} className="text-green-500" />
                    <span className="font-bold">Available Now</span>
                  </div>
                </div>
                
                <Link to="/contact" className="group relative px-10 py-5 bg-accent text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/20">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                    Initialize Project
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Background Technical Element */}
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
        </div>

        {/* BENTO STATS GRID */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { label: "Core_Engine", val: "7.2.4-STABLE", icon: "01" },
            { label: "Architecture", val: "x86_64_ARM", icon: "02" },
            { label: "Network_RTT", val: "14ms", icon: "03" },
            { label: "System_Uptime", val: "99.98%", icon: "04" }
          ].map(stat => (
            <div key={stat.label} className="p-6 glass rounded-3xl border border-black/5 dark:border-white/5 flex flex-col gap-4 group hover:bg-accent/5 transition-colors">
              <span className="font-mono text-[8px] text-accent font-bold opacity-40">{stat.icon}</span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-secondary mb-1 opacity-60">{stat.label}</p>
                <p className="text-lg font-bold tracking-tight text-primary uppercase">{stat.val}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Feature Image Section */}
        <motion.div
          variants={itemVariants}
          className="relative group rounded-[3rem] overflow-hidden mb-20 shadow-[0_64px_120px_-20px_rgba(0,0,0,0.3)] bg-neutral-900 border border-black/10 dark:border-white/10 flex items-center justify-center min-h-[400px] max-h-[90vh] w-full"
        >
          <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src="https://i.ibb.co/kVymcLrz/file-00000000b4ec71f6bb90c70e1e37911c.png" 
            alt="Kelvin Wachira Portrait" 
            className="max-w-full max-h-full object-contain pointer-events-none select-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 px-4 bg-accent/40" />
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">Technical Identity</p>
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-white tracking-tight uppercase leading-[0.85] mb-8">
                Building <br /> The future <br /> <span className="text-accent">Layer by Layer</span>
              </h2>
            </div>
            
            <div className="glass p-8 rounded-[2rem] border border-white/10 text-white min-w-[280px] hidden sm:block">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={18} className="text-accent" />
                <span className="font-mono text-[9px] uppercase tracking-widest font-black">System Capabilities</span>
              </div>
              <div className="space-y-3">
                {[
                  { l: "Frontend Mastery", v: "100%" },
                  { l: "Backend Systems", v: "94%" },
                  { l: "Cloud Architecture", v: "88%" }
                ].map(s => (
                  <div key={s.l} className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-mono opacity-60">
                      <span>{s.l}</span>
                      <span>{s.v}</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: s.v }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-accent" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-px bg-transparent md:bg-black/10 md:dark:bg-white/10 rounded-[2.5rem] overflow-hidden border-none md:border md:border-black/10 md:dark:border-white/10 shadow-none md:shadow-xl"
        >
          {[
            { tag: "Software", title: "Technical Systems", icon: <Cpu size={18} />, desc: "Developing robust software solutions with a focus on data structures and algorithms." },
            { tag: "Web", title: "Full-Stack Engineering", icon: <Code2 size={18} />, desc: "Building scalable, accessible, and fast web applications using modern frameworks." },
            { tag: "Theory", title: "Algorithmic Design", icon: <Layers size={18} />, desc: "Applying computational principles to solve complex real-world logic problems." }
          ].map((item, index) => (
            <div 
              key={item.tag}
              className={`p-10 md:p-12 bg-white dark:bg-black hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-all duration-300 group cursor-default border border-black/10 dark:border-white/10 md:border-none rounded-[2rem] md:rounded-none`}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/10 dark:border-accent/20 flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase leading-none">{item.title}</h3>
              <p className="text-secondary font-light leading-relaxed text-[15px]">{item.desc}</p>
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
