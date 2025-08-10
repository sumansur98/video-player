'use client'
import { Button } from '@/components/ui/button';
import { getDB } from '@/lib/dbHelper';
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
    <div className="max-w-5xl mx-auto p-4">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        ⬅ Back
      </Button>
      <h1 className="text-2xl font-semibold mb-4">{video.name}</h1>
      <video
        src={videoUrl}
        controls
        className="w-full max-h-[70vh] rounded-lg border"
      />
    </div>
  );
}

export default Page