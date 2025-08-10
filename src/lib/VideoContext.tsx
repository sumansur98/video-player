import { createContext, useContext, useEffect, useState } from "react";
import { VideoType } from "./types"
import { addVideoToDb, getAllVideosFromDB, updateVideoNameInDB } from "./dbHelper";
import {v4 as uuid} from 'uuid'

type VideoContextType = {
    videos : VideoType[];
    addVideo : (file : File) => void;
    updateVideoName : ({id, newName} : {id : string; newName : string}) => void;
}

const VideoContext = createContext<VideoContextType | null>(null);

export const VideoProvider = ({children} : {children : React.ReactNode}) => {
    const [videos, setVideos] = useState<VideoType[]>([]);

    //initial fetching from db
    useEffect(() => {
        const fetchVideos = async () => {
            const allVideos = await getAllVideosFromDB();
            const modifiedVideos = allVideos.map(video => ({
                ...video,
                url : URL.createObjectURL(video.file)
            }))
            setVideos(modifiedVideos);
        }

        fetchVideos();
    },[])

    const addVideo = async(file : File) => {
        const id = uuid();
        await addVideoToDb({id : id, name : file.name, file : file});
        setVideos((prev) => [
          ...prev,
          { id, name: file.name, url: URL.createObjectURL(file), file },
        ]);
    };

    const updateVideoName = async ({id, newName} : {id : string ; newName : string}) => {
        await updateVideoNameInDB({id, newName});
        setVideos((prev) =>
          prev.map((video) => (video.id === id ? { ...video, name: newName } : video))
        );
    }

    return (
      <VideoContext.Provider value={{ videos, addVideo, updateVideoName }}>
        {children}
      </VideoContext.Provider>
    );

}

export function useVideoContext() {
  const ctx = useContext(VideoContext);
  if (!ctx)
    throw new Error("useVideoContext must be used inside VideoProvider");
  return ctx;
}