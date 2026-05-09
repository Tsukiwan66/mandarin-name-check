import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!name.trim()) {
      setError('請輸入中文名字');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/check-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '發生錯誤');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'elegant': return 'bg-green-100 text-green-800 border-green-300';
      case 'natural': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'literal': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'foreign': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            中文名字檢測器
          </h1>
          <p className="text-lg text-gray-600">
            你的中文名字聽起來道地嗎？讓 AI 幫你判斷 ✨
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            輸入你的中文名字
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="例如：李大衛、王小明"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none transition"
            disabled={loading}
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '分析中...' : '檢測名字'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            {/* Score */}
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {result.score}<span className="text-2xl text-gray-400">/10</span>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full border-2 font-semibold ${getVerdictColor(result.verdict)}`}>
                {result.verdict_label}
              </div>
            </div>

            {/* Analysis */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                分析
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.analysis}
              </p>
            </div>

            {/* Suggestions */}
            {result.suggestions && result.suggestions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  推薦名字
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((suggestion, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-gray-800 rounded-lg font-medium border border-orange-200"
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Powered by OpenAI · Made with ❤️
        </div>
      </div>
    </div>
  );
}
