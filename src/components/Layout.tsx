import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Github, Twitter } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 flex flex-col">
      <header className="border-b border-stone-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-serif font-bold text-xl">V</div>
              <h1 className="font-serif font-bold text-xl tracking-tight">Veritas</h1>
            </Link>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>Home</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>About</Link>
            <Link to="/methodology" className={`text-sm font-medium transition-colors ${location.pathname === '/methodology' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>Methodology</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>Contact</Link>
          </nav>
          {/* Mobile Menu Placeholder - keeping it simple for now */}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 bg-white text-black rounded flex items-center justify-center font-serif font-bold text-lg">V</div>
                <span className="font-serif font-bold text-lg tracking-tight">Veritas</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Verifying the world's information, one claim at a time. Powered by advanced AI and grounded in truth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Stay Updated</h4>
              <p className="text-sm">Get the latest fact checks delivered to your inbox.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm text-white placeholder:text-stone-600 focus:ring-1 focus:ring-stone-500 flex-1 outline-none"
                />
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/methodology" className="hover:text-white transition-colors">Methodology</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Veritas Fact Checker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
