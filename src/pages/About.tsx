import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <Link to="/" className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Fact Checker
        </Link>

        <section className="space-y-6">
          <h1 className="text-4xl font-serif font-medium text-stone-900">About Veritas</h1>
          
          <div className="prose prose-stone max-w-none prose-headings:font-serif">
            <p className="text-lg text-stone-600 leading-relaxed">
              Veritas is an AI-powered fact-checking tool designed to help you verify claims in real-time. 
              By combining advanced language models with live Google Search data, we aim to provide accurate, 
              sourced, and nuanced analysis of statements.
            </p>
          </div>
        </section>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-sm">
            <Zap className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="font-serif font-medium text-lg mb-2">Real-Time Analysis</h3>
            <p className="text-stone-600 text-sm">
              Unlike traditional fact-checking which can take days, Veritas analyzes claims in seconds using Gemini 2.0 Flash.
            </p>
          </div>
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-sm">
            <Globe className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-serif font-medium text-lg mb-2">Grounded in Reality</h3>
            <p className="text-stone-600 text-sm">
              Every verdict is backed by live Google Search results, ensuring our AI doesn't hallucinate facts.
            </p>
          </div>
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-sm">
            <Shield className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="font-serif font-medium text-lg mb-2">Transparent Ratings</h3>
            <p className="text-stone-600 text-sm">
              We use a clear, standardized rating system (True, False, Misleading) so you know exactly where the truth lies.
            </p>
          </div>
          <div className="p-6 bg-white border border-stone-200 rounded-xl shadow-sm">
            <Users className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="font-serif font-medium text-lg mb-2">Open & Accessible</h3>
            <p className="text-stone-600 text-sm">
              Built for everyone. Whether you're a journalist, student, or curious citizen, truth should be free and easy to find.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <div className="prose prose-stone max-w-none prose-headings:font-serif">
            <h3>How It Works</h3>
            <p>
              When you enter a statement, Veritas uses Google's Gemini 2.0 Flash model to analyze the claim. 
              The model is equipped with a "Grounding" tool, which allows it to perform live Google Searches 
              to find the most relevant and up-to-date information.
            </p>
            <p>
              The system then synthesizes this information to:
            </p>
            <ul>
              <li>Determine a verdict (True, False, Misleading, or Unverified).</li>
              <li>Provide a detailed explanation of the context.</li>
              <li>Cite the specific sources used to reach the conclusion.</li>
            </ul>

            <h3>Technology Stack</h3>
            <p>
              Veritas is built using modern web technologies:
            </p>
            <ul>
              <li><strong>AI Model:</strong> Gemini 2.0 Flash (via Google GenAI SDK)</li>
              <li><strong>Grounding:</strong> Google Search Tool</li>
              <li><strong>Frontend:</strong> React 19, Vite, and Tailwind CSS</li>
              <li><strong>UI Components:</strong> Lucide React and Motion</li>
            </ul>

            <h3>Limitations</h3>
            <p>
              While Veritas strives for accuracy, it is an automated system and may occasionally make mistakes. 
              The "Grounding" feature relies on search results, which can sometimes be biased or incorrect. 
              Always verify critical information with primary sources.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
