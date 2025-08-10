"use client";

import { useVideoContext } from "@/lib/VideoContext";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const VideoList = () => {
  const { videos, updateVideoName } = useVideoContext();
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [editId, setEditId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");

  const startEditing = (id: string, currentName: string) => {
    setEditId(id);
    setTempName(currentName);
  };

  const saveName = (id: string) => {
    updateVideoName({ id, newName: tempName });
    setEditId(null);
  };

  return (
    <div className="mt-6">
      {/* Toggle View */}
      <div className="mb-4">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          onClick={() => setViewMode("list")}
          className="mr-2"
        >
          List
        </Button>
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          onClick={() => setViewMode("grid")}
        >
          Grid
        </Button>
      </div>

      {/* Render Videos */}
      {viewMode === "list" ? (
        <div className="space-y-2">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-4 border p-2 rounded-lg"
            >
              <video src={video.url} className="w-24 h-16 object-cover" />
              {editId === video.id ? (
                <div className="flex gap-2">
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <Button size="sm" onClick={() => saveName(video.id)}>
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <p>{video.name}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(video.id, video.name)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="border p-2 rounded-lg">
              <Link href={`/video/${video.id}`}>
                <video
                  src={video.url}
                  className="w-full h-32 object-cover rounded"
                />
              </Link>
              {editId === video.id ? (
                <div className="flex gap-2 mt-2">
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                  <Button size="sm" onClick={() => saveName(video.id)}>
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-2">
                  <p className="truncate">{video.name}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(video.id, video.name)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
