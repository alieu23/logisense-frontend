import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchResults } from "../api/results";

const SENTIMENT_STYLES = {
  positive: "bg-green-50 text-green-700",
  negative: "bg-red-50 text-red-600",
  neutral:  "bg-gray-100 text-gray-600",
};

const PAGE_SIZE = 10;

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await fetchResults();
        setData(Array.isArray(results) ? results : []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load results");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <Layout>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Your Results</h1>
        <p className="text-sm text-gray-500 mt-0.5">Sentiment analysis across all submitted entries</p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-red-700">{error}</p>
            <p className="text-xs text-red-500 mt-0.5">Make sure you're logged in and have a valid token.</p>
          </div>
        </div>
      )}

   
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

  
        {loading && (
          <div className="flex items-center justify-center py-16 text-sm text-gray-400 gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Loading results...
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 17H5a2 2 0 00-2 2v0a2 2 0 002 2h14a2 2 0 002-2v0a2 2 0 00-2-2h-4M9 17V9m0 8h6m0-8v8M9 9a3 3 0 106 0 3 3 0 00-6 0z"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">No results yet</p>
            <p className="text-xs text-gray-400 mt-1">Results will appear here once data is submitted</p>
          </div>
        )}

        {/* Table */}
        {!loading && data.length > 0 && (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Text</th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Sentiment</th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 text-sm text-gray-700 max-w-xs truncate">{item.text}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${SENTIMENT_STYLES[item.sentiment] ?? "bg-gray-100 text-gray-600"}`}>
                        {item.sentiment}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">

              {/* Count */}
              <p className="text-xs text-gray-400">
                Showing{" "}
                <span className="font-medium text-gray-600">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-600">{data.length}</span>{" "}
                results
              </p>

              {/* Controls */}
              <div className="flex items-center gap-1">

                {/* Prev */}
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>

                {/* Page numbers with ellipsis */}
                {pageNumbers.map((p, i) => {
                  const prev = pageNumbers[i - 1];
                  

                  return (
                    <>
                   
                      {prev && p - prev  > 1 && (
                        <span key={`ellipsis-${p}`}  className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">
                          ...
                        </span>
                      )}
                      <button
                        key={p}
                        onClick={() => goTo(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition ${
                          p === page
                            ? "bg-violet-600 text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    </>
                  );
                })}

                {/* Next */}
                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>

              </div>
            </div>
          </>
        )}

      </div>
    </Layout>
  );
}