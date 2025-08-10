"use client";

import { useVideoContext } from "@/components/VideoContext";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";

const VideoList = () => {
  const { videos, updateVideoName } = useVideoContext();
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [editId, setEditId] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");

  const editRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //to cancel editing
  useEffect(() => {
    function handleCancelEdit(event: MouseEvent) {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setEditId(null);
      }
    }
    if (editId) {
      document.addEventListener("mousedown", handleCancelEdit);
    }
    return () => {
      document.removeEventListener("mousedown", handleCancelEdit);
    };
  }, [editId]);

  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  const startEditing = (id: string, currentName: string) => {
    setEditId(id);
    setInputName(currentName);
  };

  const saveName = (id: string) => {
    updateVideoName({ id, newName: inputName });
    toast.success("Details Saved");
    setEditId(null);
  };

  if(videos.length === 0){
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-lg font-semibold text-foreground">
          No videos uploaded yet
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Toggle View */}
      <div className="mb-6 flex items-center gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          className={
            viewMode === "list"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:text-foreground"
          }
          onClick={() => setViewMode("list")}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          className={
            viewMode === "grid"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:text-foreground"
          }
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
      </div>

      {/* Render Videos */}
      {viewMode === "list" ? (
        <div className="space-y-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-4 
        bg-card border border-border 
        rounded-xl p-3 
        shadow-sm hover:shadow-md 
        transition-shadow"
            >
              <Link href={`/video/${video.id}`}>
                <video
                  src={video.url}
                  className="w-24 sm:w-28 h-20 object-cover rounded-md hover:scale-[1.01]"
                />
              </Link>
              {editId === video.id ? (
                <div ref={editRef} className="flex items-center gap-2 w-full">
                  <input
                    ref={inputRef}
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveName(video.id);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => saveName(video.id)}
                    className="text-xs"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-between">
                  <p className="truncate text-sm text-foreground">
                    {video.name}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => startEditing(video.id, video.name)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-card 
        border border-border 
        rounded-xl 
        overflow-hidden 
        shadow-sm 
        hover:shadow-md 
        transition-shadow"
            >
              <Link href={`/video/${video.id}`}>
                <video
                  src={video.url}
                  className="w-full h-36 object-cover hover:scale-[1.01]"
                />
              </Link>
              {editId === video.id ? (
                <div
                  ref={editRef}
                  className="flex justify-between items-center p-3 gap-2"
                >
                  <input
                    ref={inputRef}
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveName(video.id);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => saveName(video.id)}
                    className="text-xs"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between items-center p-3">
                  <p className="truncate text-sm text-foreground">
                    {video.name}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(video.id, video.name)}
                    className="text-xs"
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
