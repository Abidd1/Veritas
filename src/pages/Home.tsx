import { useState, useEffect } from 'react';
import { checkFact, FactCheckResult } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { Loader2, Search, AlertCircle, CheckCircle, XCircle, HelpCircle, Share2, Clock, Trash2, X, ArrowRight, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [statement, setStatement] = useState('');
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<FactCheckResult[]>([]);
  const [historySearch, setHistorySearch] = useState('');
  const [historyCategory, setHistoryCategory] = useState('');
  const [historyVerdict, setHistoryVerdict] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('factCheckHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (item: FactCheckResult) => {
    const newHistory = [item, ...history.filter(h => h.claim !== item.claim)].slice(0, 50); // Keep last 50
    setHistory(newHistory);
    localStorage.setItem('factCheckHistory', JSON.stringify(newHistory));
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.claim.toLowerCase().includes(historySearch.toLowerCase());
    const matchesCategory = historyCategory ? item.category === historyCategory : true;
    const matchesVerdict = historyVerdict ? item.verdict === historyVerdict : true;
    return matchesSearch && matchesCategory && matchesVerdict;
  });

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('factCheckHistory');
  };

  const handleClear = () => {
    setStatement('');
    setResult(null);
    setError(null);
  };

  const handleCheck = async (textOverride?: string) => {
    const textToCheck = textOverride || statement;
    if (!textToCheck.trim()) return;
    
    // If it's a new check (not an override), clear input. 
    // If override, we set statement to match.
    if (textOverride) {
      setStatement(textOverride);
    } else {
      setStatement(''); 
    }

    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await checkFact(textToCheck);
      setResult(data);
      saveToHistory(data);
    } catch (err) {
      setError('Failed to verify the statement. Please try again.');
      if (!textOverride) setStatement(textToCheck); // Restore if failed
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const shareData = {
      title: 'Veritas Fact Check',
      text: `Fact Check: ${result.claim}\nVerdict: ${result.verdict}\n\nChecked with Veritas.`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.text);
      alert('Result copied to clipboard!');
    }
  };

  const getVerdictColor = (verdict: string) => {
    const v = verdict.toLowerCase();
    if (v.includes('true') && !v.includes('partially')) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (v.includes('false')) return 'text-red-600 bg-red-50 border-red-200';
    if (v.includes('misleading') || v.includes('partially')) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const getVerdictIcon = (verdict: string) => {
    const v = verdict.toLowerCase();
    if (v.includes('true') && !v.includes('partially')) return <CheckCircle className="w-5 h-5" />;
    if (v.includes('false')) return <XCircle className="w-5 h-5" />;
    if (v.includes('misleading') || v.includes('partially')) return <AlertCircle className="w-5 h-5" />;
    return <HelpCircle className="w-5 h-5" />;
  };

  // Schema.org ClaimReview JSON-LD
  const renderSchema = (res: FactCheckResult) => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      "datePublished": new Date().toISOString().split('T')[0],
      "url": window.location.href,
      "claimReviewed": res.claim,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": res.verdict === "True" ? "5" : res.verdict === "False" ? "1" : "3",
        "bestRating": "5",
        "worstRating": "1",
        "alternateName": res.verdict
      },
      "author": {
        "@type": "Organization",
        "name": "Veritas Fact Checker"
      }
    };
    return (
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-serif font-medium text-stone-900">Verify claims in real-time.</h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Enter a statement below to cross-reference it with trusted sources from across the web using Google Search.
          </p>
        </section>

        <div className="relative group">
          <div className="absolute inset-0 bg-stone-200 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white rounded-2xl shadow-sm border border-stone-200 p-2 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="Paste a claim or statement here..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-lg placeholder:text-stone-400 min-w-0"
              disabled={loading}
            />
            
            {statement && (
              <button
                onClick={handleClear}
                className="p-2 text-stone-400 hover:text-stone-600 transition-colors rounded-full hover:bg-stone-100"
                title="Clear input"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => handleCheck()}
              disabled={loading || !statement.trim()}
              className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 min-w-[120px] shrink-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Verify</span>
                  <Search className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {renderSchema(result)}
              
              {/* Fact Check Article Card */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-500 bg-stone-200/50 px-2 py-1 rounded">
                        {result.category}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-serif font-medium text-xl text-stone-900 leading-tight">
                      {result.claim}
                    </h3>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getVerdictColor(result.verdict)}`}>
                    {getVerdictIcon(result.verdict)}
                    <span className="font-bold uppercase tracking-wide text-sm">{result.verdict}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-stone-400" />
                      Analysis
                    </h4>
                    <div className="prose prose-stone max-w-none prose-headings:font-serif prose-a:text-blue-600 hover:prose-a:text-blue-800">
                      <ReactMarkdown>{result.explanation}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Sources */}
                  {result.groundingChunks && result.groundingChunks.length > 0 && (
                    <div className="pt-6 border-t border-stone-100">
                      <h4 className="text-sm font-mono uppercase text-stone-500 tracking-wider mb-3">Sources & Evidence</h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {result.groundingChunks.map((chunk, i) => (
                          chunk.web?.uri && (
                            <a
                              key={i}
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all group"
                            >
                              <h5 className="font-medium text-stone-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                                {chunk.web.title || 'Untitled Source'}
                              </h5>
                              <p className="text-xs text-stone-400 mt-1 truncate font-mono">
                                {new URL(chunk.web.uri).hostname}
                              </p>
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center">
                  <div className="text-xs text-stone-500">
                    Confidence: <span className="font-medium text-stone-900">{result.confidence}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link to="/contact" className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-red-600 transition-colors" title="Report an error">
                      <Flag className="w-4 h-4" />
                      <span className="hidden sm:inline">Report Error</span>
                    </Link>
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Result
                    </button>
                  </div>
                </div>
              </div>

              {/* Related Checks */}
              {result.relatedChecks && result.relatedChecks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-medium text-lg text-stone-900">Related Fact Checks</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {result.relatedChecks.map((check, i) => (
                      <div 
                        key={i}
                        onClick={() => handleCheck(check.claim)}
                        className="bg-white p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-sm cursor-pointer transition-all group flex flex-col h-full"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getVerdictColor(check.verdict)}`}>
                            {check.verdict}
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-colors" />
                        </div>
                        <p className="font-medium text-stone-900 text-sm line-clamp-3 mb-2 flex-1">
                          {check.claim}
                        </p>
                        <span className="text-xs text-blue-600 font-medium group-hover:underline">
                          Verify this claim
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Recent History */}
          {!result && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-medium text-lg text-stone-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400" />
                  Recent Checks
                </h3>
                <button 
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear History
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={historyCategory}
                    onChange={(e) => setHistoryCategory(e.target.value)}
                    className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:border-stone-400 outline-none transition-colors"
                  >
                    <option value="">All Categories</option>
                    {Array.from(new Set(history.map(h => h.category))).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    value={historyVerdict}
                    onChange={(e) => setHistoryVerdict(e.target.value)}
                    className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:border-stone-400 outline-none transition-colors"
                  >
                    <option value="">All Verdicts</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                    <option value="Misleading">Misleading</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-8 text-stone-500 text-sm">
                    No history found matching your filters.
                  </div>
                ) : (
                  filteredHistory.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setStatement(item.claim);
                        setResult(item);
                      }}
                      className="bg-white p-4 rounded-xl border border-stone-200 hover:border-stone-300 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="truncate flex-1 mr-4">
                        <p className="font-medium text-stone-900 truncate">{item.claim}</p>
                        <p className="text-xs text-stone-500 mt-1">{item.category} • {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${getVerdictColor(item.verdict)}`}>
                        {item.verdict}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
