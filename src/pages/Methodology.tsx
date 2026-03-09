import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react';

export default function Methodology() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <Link to="/" className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Fact Checker
        </Link>

        <section className="space-y-6">
          <h1 className="text-4xl font-serif font-medium text-stone-900">Our Methodology</h1>
          
          <div className="prose prose-stone max-w-none prose-headings:font-serif">
            <p className="text-lg text-stone-600 leading-relaxed">
              At Veritas, transparency is our core value. We believe you should know exactly how we arrive at our conclusions. 
              Our process combines advanced artificial intelligence with rigorous sourcing standards.
            </p>

            <h3>1. Initial Analysis</h3>
            <p>
              When a claim is submitted, our AI first analyzes the linguistic structure and context. It identifies the core assertion, 
              key entities involved, and the timeframe of the event.
            </p>

            <h3>2. Grounding & Verification</h3>
            <p>
              The system performs multiple targeted Google Searches to find primary sources, reputable news reports, and official statements. 
              We prioritize:
            </p>
            <ul>
              <li><strong>Primary Sources:</strong> Government documents, scientific papers, direct quotes.</li>
              <li><strong>Trusted Media:</strong> Established news organizations with a history of accuracy.</li>
              <li><strong>Expert Consensus:</strong> Peer-reviewed research and expert commentary.</li>
            </ul>

            <h3>3. Synthesis & Verdict</h3>
            <p>
              The AI synthesizes the gathered information to determine a verdict. We use a standardized rating system:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 not-prose my-8">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm uppercase tracking-wide mb-1">True</h4>
                  <p className="text-sm text-emerald-700">The claim is supported by factual evidence and is accurate.</p>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900 text-sm uppercase tracking-wide mb-1">False</h4>
                  <p className="text-sm text-red-700">The claim is contradicted by factual evidence.</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide mb-1">Misleading</h4>
                  <p className="text-sm text-amber-700">The claim contains elements of truth but ignores critical context.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-1">Unverified</h4>
                  <p className="text-sm text-slate-600">Insufficient evidence exists to prove or disprove the claim.</p>
                </div>
              </div>
            </div>

            <h3>4. Citation</h3>
            <p>
              Every fact check includes direct links to the sources used. We believe in showing our work so you can verify the information yourself.
            </p>

            <h3>Correction Policy</h3>
            <p>
              If new evidence emerges that changes a verdict, we update the fact check immediately and note the correction at the top of the article. 
              We are committed to accuracy and accountability.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
