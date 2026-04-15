import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchResults } from "../api/results";

const SENTIMENT_STYLES = {
  positive: "bg-green-50 text-green-700",
  negative: "bg-red-50 text-red-600",
  neutral:  "bg-gray-100 text-gray-600",
};

const PAGE_SIZE = 10;

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await fetchResults();
        setData(Array.isArray(results) ? results : []);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const total    = data.length;
  const positive = data.filter((d) => d.sentiment === "positive").length;
  const negative = data.filter((d) => d.sentiment === "negative").length;
  const neutral  = data.filter((d) => d.sentiment === "neutral").length;

  const totalPages  = Math.ceil(total / PAGE_SIZE);
  const paginated   = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const goTo        = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const stats = [
    {
      label: "Total records",
      value: total,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
      ),
      color: "bg-violet-50 text-violet-500",
    },
    {
      label: "Positive",
      value: positive,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
          <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
        </svg>
      ),
      color: "bg-green-50 text-green-500",
    },
    {
      label: "Negative",
      value: negative,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/>
          <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/>
        </svg>
      ),
      color: "bg-red-50 text-red-500",
    },
    {
      label: "Neutral",
      value: neutral,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 15h8M9 9h.01M15 9h.01"/>
        </svg>
      ),
      color: "bg-gray-100 text-gray-500",
    },
  ];

  return (
    <Layout>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Admin Dashboard Testing (CI/CD)</h1>
        <p className="text-sm text-gray-500 mt-0.5">Overview of all sentiment records across users</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              {icon}
            </div>
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-medium text-gray-900">
              {loading ? "—" : value}
            </p>
          </div>
        ))}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-red-700">{error}</p>
            <p className="text-xs text-red-500 mt-0.5">Make sure you have admin access and a valid token.</p>
          </div>
        </div>
      )}

      {/* Table card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 text-sm text-gray-400 gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Loading records...
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">No records found</p>
            <p className="text-xs text-gray-400 mt-1">Data will appear here once users submit entries</p>
          </div>
        )}

        {/* Table — desktop */}
        {!loading && data.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Text</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Sentiment</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">User</th>
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
                      <td className="px-5 py-4 text-sm text-gray-400 font-mono">{item.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {paginated.map((item) => (
                <div key={item.id} className="p-4 flex flex-col gap-2">
                  <p className="text-sm text-gray-700 line-clamp-2">{item.text}</p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${SENTIMENT_STYLES[item.sentiment] ?? "bg-gray-100 text-gray-600"}`}>
                      {item.sentiment}
                    </span>
                    <span className="text-xs text-gray-400 font-mono truncate max-w-[160px]">{item.userId}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-t border-gray-100 gap-4">
              <p className="text-xs text-gray-400 shrink-0">
                <span className="font-medium text-gray-600">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}
                </span>{" "}
                of <span className="font-medium text-gray-600">{total}</span>
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>

                {pageNumbers.map((p, i) => {
                  const prev = pageNumbers[i - 1];
                  return (
                    <>
                      {prev && p - prev > 1 && (
                        <span key={`ellipsis-${p}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">
                          ...
                        </span>
                      )}
                      <button
                        
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