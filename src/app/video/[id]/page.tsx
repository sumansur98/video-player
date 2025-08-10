'use client'
import { Button } from '@/components/ui/button';
import { getDB } from '@/lib/dbHelper';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [video, setVideo] = useState<{
      id: string;
      name: string;
      file: File;
    } | undefined | null>(null);
    const [videoUrl, setVideoUrl] = useState<string>("")

    useEffect(()=>{

        const fetchVideo = async () => {
            const db = await getDB();
            const vid = await db.get('videos',id as string);
            setVideo(vid);
            setVideoUrl(URL.createObjectURL(vid?.file));
        }

        fetchVideo();
    }, [id])

    if (!video) {
      return <p className="p-4">Video not found.</p>;
    }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Back button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      {/* Video Player */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-contain bg-black"
        />
      </div>

      {/* Video Title */}
      <h1 className="text-2xl font-semibold text-foreground">{video.name}</h1>
    </div>
  );
}

export default Page