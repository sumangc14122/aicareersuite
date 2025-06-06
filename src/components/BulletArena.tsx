"use client";

import { useState } from "react";
import axios from "axios";

interface BulletArenaProps {
  bullets: string[];
  onUpdate: (newBullets: string[]) => void;
}

export function BulletArena({ bullets, onUpdate }: BulletArenaProps) {
  const [pool, setPool] = useState(() => [...bullets]);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);
  const [loading, setLoading] = useState(false);

  // pick two at random
  function nextPair() {
    if (pool.length < 2) return setCurrentPair(null);
    const i = Math.floor(Math.random() * pool.length);
    let j = Math.floor(Math.random() * pool.length);
    while (j === i) j = Math.floor(Math.random() * pool.length);
    setCurrentPair([pool[i], pool[j]]);
  }

  // when user chooses a winner, ask GPT to refine
  async function pick(winner: string, loser: string) {
    setLoading(true);
    try {
      const res = await axios.post<string>("/api/wizard/bullet-arena", {
        winner,
        loser,
      });
      const refined = res.data.trim();
      // replace winner in the original bullets list
      onUpdate(bullets.map((b) => (b === winner ? refined : b)));
      // remove both from pool so we don't repeat
      setPool(pool.filter((b) => b !== winner && b !== loser));
      nextPair();
    } catch (e) {
      console.error(e);
      alert("Arena battle failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // start the first matchup when mounted
  if (currentPair === null && pool.length >= 2) nextPair();

  if (!currentPair) {
    return (
      <div className="italic text-gray-600">
        All bullets have fought in the arena!
      </div>
    );
  }

  const [a, b] = currentPair;
  return (
    <div className="space-y-4 rounded bg-indigo-50 p-4">
      <h4 className="font-semibold">🏆 Bullet Arena</h4>
      <p className="text-sm">
        Which of these reads stronger? We&apos;ll refine your choice.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[a, b].map((txt, idx) => (
          <button
            key={`${txt.slice(0, 20)}-${idx}`}
            onClick={() => pick(txt === a ? a : b, txt === a ? b : a)}
            disabled={loading}
            className="flex items-center justify-center rounded border bg-white p-3 text-left hover:shadow"
          >
            {loading && <span className="mr-2 animate-pulse">…</span>}
            {txt}
          </button>
        ))}
      </div>
    </div>
  );
}
