"use client"
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error(err);
      setResponse('Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">ChatGPT Integration</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 w-full max-w-md border border-gray-300 rounded">
          <h2 className="font-bold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
