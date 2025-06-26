'use client'

import { useEffect, useState } from "react";
import { Song } from "@/types";
import Library from "./Library";

export default function HomeClient() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch("/api/user-songs");
      if (!res.ok) return;
      const data = await res.json();
      setSongs(data || []);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  if (loading) return <div className="p-6">Loading songs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Proufalme</h1>
      <Library songs={songs} />
    </div>
  );
}
