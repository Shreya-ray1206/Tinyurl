"use client";

import { useState, useEffect } from "react";

interface Link {
  code: string;
  url: string;
  clicks: number;
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch links from API
  async function fetchLinks() {
    try {
      const res = await fetch("/api/links");
      const data = await res.json();

      if (Array.isArray(data)) {
        setLinks(data);
        setError(null);
      } else {
        setLinks([]);
        setError(data.error || "Failed to fetch links");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLinks([]);
      setError("Failed to fetch links");
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        body: JSON.stringify({ url, code: customCode || undefined }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) alert("Code already exists!");
        else alert(data.error || "Failed to create link");
        setLoading(false);
        return;
      }

      setUrl("");
      setCustomCode("");
      await fetchLinks();
    } catch (err) {
      console.error(err);
      alert("Failed to create link");
    } finally {
      setLoading(false);
    }
  }

  // Delete a link
  async function deleteLink(code: string) {
    try {
      await fetch(`/api/links/${code}`, { method: "DELETE" });
      fetchLinks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete link");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          TinyLink Dashboard
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 border rounded-xl bg-gray-50 shadow-inner space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Long URL</label>
            <input
              required
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Custom Code (optional)</label>
            <input
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="mycode123"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Short Link"}
          </button>
        </form>

        {/* TABLE */}
        <div className="mt-10 overflow-x-auto">
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <table className="w-full border rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Code</th>
                <th className="p-3 border">Target</th>
                <th className="p-3 border">Clicks</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500 italic">
                    No links created yet.
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr key={link.code} className="bg-white hover:bg-gray-50">
                    <td className="p-3 border font-bold text-blue-600 underline">
                      <a href={`/code/${link.code}`}>{link.code}</a>
                    </td>
                    <td className="p-3 border">{link.url}</td>
                    <td className="p-3 border">{link.clicks}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => deleteLink(link.code)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
