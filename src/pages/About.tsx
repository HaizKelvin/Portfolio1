import { motion } from "motion/react";

export default function About() {
  return (
    <div className="pt-40 pb-20 px-6">
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
              Built for <br /> Purpose<span className="text-accent italic font-serif">.</span>
            </h1>
            <div className="space-y-8 text-xl md:text-2xl font-light text-secondary leading-normal">
              <p>
                Currently pursuing a degree in Computer Science, I am dedicated to mastering the core principles of computation while building practical, high-impact digital products.
              </p>
              <p>
                My academic foundation allows me to approach development with technical rigour, focusing on algorithm efficiency, system scalability, and the underlying logic that powers modern software.
              </p>
            </div>

            {/* Terminal DNA Segment */}
            <div className="mt-20 p-8 bg-neutral-950 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-orange-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-4">root@portfolio:~/skills</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="flex gap-4">
                  <span className="text-accent">❯</span>
                  <span className="text-white/80">ls stack/languages</span>
                </div>
                <div className="text-white/40 pl-8 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <span>TypeScript.ts</span>
                  <span>Python.py</span>
                  <span>C++.cpp</span>
                  <span>Rust.rs</span>
                  <span>Go.go</span>
                  <span>SQL.sql</span>
                  <span>Java.java</span>
                  <span>ASM.s</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <span className="text-accent">❯</span>
                  <span className="text-white/80">cat stack/tools</span>
                </div>
                <div className="text-white/40 pl-8 grid grid-cols-2 md:grid-cols-3 gap-2">
                  <span>Docker</span>
                  <span>Kubernetes</span>
                  <span>PostgreSQL</span>
                  <span>Redis</span>
                  <span>Firebase</span>
                  <span>Git/CI</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <span className="text-accent">❯</span>
                  <span className="text-white/80">grep -r "focus" interests</span>
                </div>
                <div className="text-white/60 pl-8 italic">
                  "Building secure, distributed systems with low-latency performance."
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-12">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6 font-bold">Expertise</h3>
                <ul className="space-y-4">
                  {[
                    "Distributed Systems", 
                    "System Architecture", 
                    "Cloud Engineering", 
                    "Algorithmic Analysis", 
                    "Network Security",
                    "Database Engineering",
                    "Full-Stack Dev", 
                    "Performance Ops"
                  ].map(s => (
                    <li key={s} className="text-lg font-bold border-b border-black/5 dark:border-white/5 pb-4 last:border-0">{s}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6 font-bold">Philosophy</h3>
                <p className="text-secondary font-light italic">"Complexity is easy. Simplicity is the hardest thing to achieve, but the only thing worth doing."</p>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-40 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="font-mono text-[10px] uppercase tracking-widest">© 2024 Kelvin Wachira Portfolio</p>
          <p className="font-mono text-[10px] uppercase tracking-widest">NBO-GLOBAL / 04:45 PM EAT</p>
        </footer>
      </main>
    </div>
  );
}
