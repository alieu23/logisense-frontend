export default function AddReview({open, onClose, onSubmit}) {
    if (!open) return null;

    return(
        <div className="fixed insert-0 bg-black/30 z-40 flex items-center justify-center px-4 " onClick={onClose}>
             <div
        className="bg-white rounded-2xl border border-gray-200 w-full max-w-md p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-medium text-gray-900">Add entry</h2>
            <p className="text-xs text-gray-400 mt-0.5">Submit a new text for sentiment analysis</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

                <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            onSubmit({ text: fd.get("text"), sentiment: fd.get("sentiment") });
          }}
        >
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Text</label>
              <textarea
                name="text"
                rows={4}
                required
                placeholder="Enter text to analyse..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition resize-none"
              />
            </div>

 {/*            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Sentiment</label>
              <select
                name="sentiment"
                defaultValue="positive"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 transition"
              >
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
            </div> */}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Save entry
            </button>
          </div>
        </form>

      </div>
        </div>
    )
}