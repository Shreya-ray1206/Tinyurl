"use client";

import { useState } from "react";

interface Link {
  code: string;
  url: string;
  clicks: number;
  created_at: string;
  last_clicked: string | null;
}

export default function LinkStatsClient({ link }: { link: Link }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-10">
      <div className="max-w-xl mx-auto bg-white shadow-xl p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Stats for <span className="text-blue-600">{link.code}</span>
        </h1>

        <div className="space-y-4">
          <p>
            <span className="font-semibold">Original URL:</span>{" "}
            <a href={link.url} className="text-blue-600 underline" target="_blank">
              {link.url}
            </a>
          </p>
          <p><span className="font-semibold">Clicks:</span> {link.clicks}</p>
          <p><span className="font-semibold">Last Clicked:</span> {link.last_clicked ?? "Never"}</p>
          <p><span className="font-semibold">Created At:</span> {new Date(link.created_at).toLocaleString()}</p>
        </div>

        <button
          onClick={handleCopy}
          className="mt-6 w-full py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
        >
          {copied ? "Copied!" : "Copy Short URL"}
        </button>
      </div>
    </div>
  );
}
