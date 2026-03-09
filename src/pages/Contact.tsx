import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, Mail, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    claim: '',
    source: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', claim: '', source: '' });
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <Link to="/" className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Fact Checker
        </Link>

        <section className="space-y-6">
          <h1 className="text-4xl font-serif font-medium text-stone-900">Submit a Claim</h1>
          
          <div className="prose prose-stone max-w-none prose-headings:font-serif">
            <p className="text-lg text-stone-600 leading-relaxed">
              Have you seen a suspicious claim online? Help us investigate it. 
              Submit the details below, and our team (and AI) will look into it.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-emerald-900">Thank you!</h3>
              <p className="text-emerald-700 max-w-md mx-auto">
                Your claim has been submitted for review. We'll notify you if we publish a fact check on this topic.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-medium text-emerald-600 hover:text-emerald-800 underline"
              >
                Submit another claim
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-stone-700">Your Name (Optional)</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-200 focus:border-stone-400 outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-stone-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-200 focus:border-stone-400 outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="claim" className="text-sm font-medium text-stone-700">The Claim to Check</label>
                <textarea
                  id="claim"
                  required
                  rows={4}
                  value={formData.claim}
                  onChange={(e) => setFormData({...formData, claim: e.target.value})}
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-200 focus:border-stone-400 outline-none transition-all resize-none"
                  placeholder="e.g., I saw a post claiming that..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="source" className="text-sm font-medium text-stone-700">Source URL (Where did you see it?)</label>
                <input
                  type="url"
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-200 focus:border-stone-400 outline-none transition-all"
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <p className="text-xs text-stone-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  We protect your privacy.
                </p>
                <button 
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors flex items-center gap-2"
                >
                  Submit Claim
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="pt-12 border-t border-stone-200 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-serif font-medium text-lg mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-stone-400" />
                General Inquiries
              </h3>
              <p className="text-stone-600 text-sm mb-4">
                For press, partnerships, or general questions about Veritas.
              </p>
              <a href="mailto:hello@veritas.ai" className="text-blue-600 font-medium hover:underline">hello@veritas.ai</a>
            </div>
            <div>
              <h3 className="font-serif font-medium text-lg mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-stone-400" />
                Report an Error
              </h3>
              <p className="text-stone-600 text-sm mb-4">
                Found a mistake in one of our fact checks? Let us know immediately.
              </p>
              <a href="mailto:corrections@veritas.ai" className="text-blue-600 font-medium hover:underline">corrections@veritas.ai</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
