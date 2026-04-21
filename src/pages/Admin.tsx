import { useState, useEffect, FormEvent } from "react";
import { auth, db, addProject, handleLogin, handleLogout } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "motion/react";
import { ArrowLeft, Plus, LogOut, ShieldCheck, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    image: "",
    description: "",
    link: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const adminDoc = await getDoc(doc(db, "admins", u.uid));
        setIsAdmin(adminDoc.exists());
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setAdding(true);
    try {
      await addProject(formData);
      setFormData({ title: "", type: "", image: "", description: "", link: "" });
      setMessage({ type: 'success', text: 'Project added successfully!' });
      setTimeout(() => navigate("/work"), 1500);
    } catch (error) {
      console.error("Failed to add project:", error);
      setMessage({ type: 'error', text: 'Error adding project. Check console.' });
    } finally {
      setAdding(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <ShieldCheck size={64} className="text-secondary mb-6" />
      <h1 className="text-4xl font-bold mb-4">Admin Access</h1>
      <p className="text-secondary mb-8 max-w-sm">Sign in with your authorized Google account to manage your portfolio projects.</p>
      <button 
        onClick={handleLogin}
        className="px-8 py-4 bg-primary text-bg-base font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-3"
      >
        Sign in with Google
      </button>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle size={64} className="text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-secondary mb-8 max-w-md">
        Your account ({user.email}) is not registered as an administrator. 
        Please add your UID to the <span className="font-mono text-accent">admins</span> collection in Firestore to proceed.
      </p>
      <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl mb-8 font-mono text-xs select-all">
        UID: {user.uid}
      </div>
      <button 
        onClick={handleLogout}
        className="px-8 py-4 border border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500/10 transition-all flex items-center gap-3"
      >
        <LogOut size={18} /> Sign Out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-secondary hover:text-primary mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black tracking-tighter uppercase">Add Project</h1>
          <button 
            onClick={handleLogout}
            className="p-3 text-secondary hover:text-red-500 transition-colors"
            title="Sign Out"
          >
            <LogOut size={24} />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-[2.5rem]"
        >
          {message && (
            <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest ${
              message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}>
              <AlertCircle size={14} />
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-secondary">Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors" 
                  placeholder="e.g. Quantum Dashboard"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-secondary">Category</label>
                <input 
                  required
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors" 
                  placeholder="e.g. Full-Stack Systems"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary">Image URL</label>
              <input 
                required
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors" 
                placeholder="Direct link to project image (e.g. from ImgBB)"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary">Link (Optional)</label>
              <input 
                value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors" 
                placeholder="https://github.com/..."
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-secondary">Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-accent transition-colors resize-none" 
                rows={4}
                placeholder="Briefly describe the technologies used and key features..."
              />
            </div>

            <button 
              disabled={adding}
              className="w-full bg-accent text-white p-6 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {adding ? "Adding..." : <><Plus size={20} /> Add to Portfolio</>}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
