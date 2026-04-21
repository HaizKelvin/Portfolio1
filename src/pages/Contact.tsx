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

          <div className="bg-neutral-50 dark:bg-white/5 p-10 lg:p-16 rounded-[3rem] border border-black/5 dark:border-white/5">
            <h3 className="text-2xl font-bold mb-10 tracking-tight uppercase">Inquiry form</h3>
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-40">Your name</label>
                <input type="text" className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-40">Your email</label>
                <input type="email" className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors" placeholder="email@address.com" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-40">Your message</label>
                <textarea className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors resize-none" rows={4} placeholder="Describe your project" />
              </div>
              <button className="group flex items-center justify-between w-full p-8 bg-black text-white dark:bg-white dark:text-black rounded-2xl hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all shadow-xl">
                <span className="text-lg font-bold uppercase tracking-widest">Send Inquiry</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
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
