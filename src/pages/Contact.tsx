import { motion } from "motion/react";
import { ArrowRight, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-40 pb-20 px-6">
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 uppercase leading-none">
                Start a <br /> <span className="text-accent italic font-serif">Conversation</span>
              </h1>
              <p className="text-2xl text-secondary font-light max-w-sm mb-12">
                Have an idea? Let's turn it into something tangible and impactful.
              </p>

              <div className="space-y-12">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-6 font-bold">Contact Details</h3>
                  <a href="mailto:hello@wacchira.dev" className="text-3xl font-medium tracking-tight hover:text-accent transition-colors">
                    hello@kelvin.dev
                  </a>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-6 font-bold">Find me on</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: <Twitter size={20} />, label: "TW", url: "#" },
                      { icon: <Linkedin size={20} />, label: "LN", url: "https://linkedin.com/in/kelvinwachira" },
                      { icon: <Github size={20} />, label: "GH", url: "https://github.com/kelvinwachira" }
                    ].map(s => (
                      <a 
                        key={s.label} 
                        href={s.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="bg-white dark:bg-black/40 p-10 lg:p-20 rounded-[3rem] border border-black/20 dark:border-white/10 shadow-2xl">
            <h3 className="text-3xl font-black mb-12 tracking-tight uppercase">Inquiry System</h3>
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] font-black text-accent px-4 border-l-2 border-accent">Identification: USR_NAME</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-100 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 p-6 rounded-2xl outline-none focus:ring-4 focus:ring-accent/20 focus:bg-white dark:focus:bg-black transition-all text-black dark:text-white text-lg placeholder:text-neutral-500 font-bold" 
                  placeholder="Kelvin Wachira" 
                />
              </div>
              <div className="space-y-4">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] font-black text-accent px-4 border-l-2 border-accent">Identification: USR_EMAIL</label>
                <input 
                  type="email" 
                  className="w-full bg-neutral-100 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 p-6 rounded-2xl outline-none focus:ring-4 focus:ring-accent/20 focus:bg-white dark:focus:bg-black transition-all text-black dark:text-white text-lg placeholder:text-neutral-500 font-bold" 
                  placeholder="contact@architect.dev" 
                />
              </div>
              <div className="space-y-4">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] font-black text-accent px-4 border-l-2 border-accent">Payload: MSG_DATA</label>
                <textarea 
                  className="w-full bg-neutral-100 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 p-6 rounded-2xl outline-none focus:ring-4 focus:ring-accent/20 focus:bg-white dark:focus:bg-black transition-all resize-none text-black dark:text-white text-lg min-h-[220px] placeholder:text-neutral-500 font-bold" 
                  placeholder="Describe your architectural challenge..." 
                />
              </div>
              <button className="group flex items-center justify-between w-full p-10 bg-accent text-white rounded-3xl hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl shadow-accent/20">
                <span className="text-xl font-black md:text-2xl uppercase tracking-[0.1em]">Execute Inquiry</span>
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  <ArrowRight size={28} />
                </div>
              </button>
            </form>
          </div>
        </div>
        
        <footer className="mt-40 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="font-mono text-[10px] uppercase tracking-widest uppercase">© 2024 Kelvin Wachira Portfolio</p>
          <p className="font-mono text-[10px] uppercase tracking-widest uppercase">NBO-GLOBAL / 04:45 PM EAT</p>
        </footer>
      </main>
    </div>
  );
}
