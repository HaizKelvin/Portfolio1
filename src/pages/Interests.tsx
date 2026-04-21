import { motion } from "motion/react";
import { Camera, Music, Gamepad2, Plane, Coffee, BookOpen } from "lucide-react";

export default function Interests() {
  const interests = [
    {
      id: "photography",
      title: "Street Photography",
      icon: <Camera size={24} />,
      desc: "Capturing the raw architectural beauty and human energy of Nairobi's streets. I find storytelling in the interplay of light and concrete.",
      accent: "bg-blue-500"
    },
    {
      id: "music",
      title: "Sound Design",
      icon: <Music size={24} />,
      desc: "Exploring electronic soundscapes and ambient production. Music is my meditative space after a day of complex coding.",
      accent: "bg-purple-500"
    },
    {
      id: "gaming",
      title: "Tactical Gaming",
      icon: <Gamepad2 size={24} />,
      desc: "Passionate about strategy games and world-building simulations that challenge logical reasoning and long-term planning.",
      accent: "bg-emerald-500"
    },
    {
      id: "travel",
      title: "Global Exploration",
      icon: <Plane size={24} />,
      desc: "Traveling to experience different cultures and technical ecosystems. Every journey starts with a map and ends with a story.",
      accent: "bg-orange-500"
    },
    {
      id: "coffee",
      title: "Specialty Coffee",
      icon: <Coffee size={24} />,
      desc: "Finding the perfect roast is like finding the perfect bug-free algorithm. Precision, heat, and timing are everything.",
      accent: "bg-amber-700"
    },
    {
      id: "reading",
      title: "Sci-Fi Literature",
      icon: <BookOpen size={24} />,
      desc: "Deep diving into speculative fiction. Books like Neuromancer and Foundation shape my vision of the digital future.",
      accent: "bg-pink-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-40 pb-20 px-6">
      <main className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Beyond <br /> The <span className="text-accent italic font-serif">Code</span>
          </h1>
          <p className="text-2xl text-secondary font-light max-w-2xl leading-relaxed">
            Exploring the intersection of creativity, culture, and lifestyle. These are the pursuits that keep my logical mind balanced and my curiosity alive.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {interests.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="p-10 bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-black/10 dark:border-white/10 hover:border-accent/40 hover:shadow-2xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 transition-transform group-hover:scale-110 ${item.accent} shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase text-primary dark:text-white">{item.title}</h3>
              <p className="text-secondary dark:text-secondary/60 font-light leading-relaxed text-[15px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <footer className="mt-40 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="font-mono text-[10px] uppercase tracking-widest">© 2024 Kelvin Wachira Portfolio</p>
          <p className="font-mono text-[10px] uppercase tracking-widest">NBO-GLOBAL / 04:45 PM EAT</p>
        </footer>
      </main>
    </div>
  );
}
