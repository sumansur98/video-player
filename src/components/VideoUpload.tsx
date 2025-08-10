"use client";

import { useVideoContext } from "@/components/VideoContext";
import React, { useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

const VideoUpload = () => {
  const { addVideo } = useVideoContext();

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      alert("Only video files are accepted.");
      return;
    }

    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("video/")) {
        addVideo(file);
      } else {
        alert("Only video files are allowed!");
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"] },
      multiple: true,
    });

  return (
    <div
      {...getRootProps()}
      className="
    flex flex-col items-center justify-center
    border-2 border-dashed
    border-muted-foreground
    rounded-xl
    p-8
    text-center
    bg-card
    hover:border-primary hover:bg-accent/10
    transition-colors
    cursor-pointer
    min-h-[150px]
  "
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-foreground font-medium">Drop your videos here...</p>
      ) : (
        <div>
          <p className="text-foreground font-medium">Drag & drop videos here</p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to select files
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
