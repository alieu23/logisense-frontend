export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="mt-4 p-4 bg-white shadow rounded-lg">
      <p className="text-gray-600">Text:</p>
      <p className="font-medium">{result.text}</p>

      <p className="mt-2 text-gray-600">Sentiment:</p>
      <p className={`font-bold ${result.sentiment === 'negative' ? 'text-red-600' : 'text-blue-600'}`}>{result.sentiment}</p>
    </div>
  );
}