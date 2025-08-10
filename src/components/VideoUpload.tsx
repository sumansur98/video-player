"use client";

import { useVideoContext } from "@/lib/VideoContext";
import React from "react";
import { useDropzone } from "react-dropzone";

const VideoUpload = () => {
  const { addVideo } = useVideoContext();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("video/")) {
        addVideo(file);
      } else {
        alert("Only video files are allowed!");
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-6 text-center rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the videos here...</p>
      ) : (
        <p>Drag & drop videos here, or click to select</p>
      )}
    </div>
  );
};

export default VideoUpload;
