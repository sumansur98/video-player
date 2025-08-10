import { openDB } from "idb";
import type { DBSchema } from "idb";
import { VideoType } from "./types";

interface VideoDB extends DBSchema {
  videos: {
    key: string;
    value: {
      id: string;
      name: string;
      file: File;
    };
  };
}

const getDB = async () => {
  return openDB<VideoDB>("video-store", 1, {
    upgrade(db) {
        db.createObjectStore("videos", {keyPath : 'id'})
    }
  });
};

const addVideoToDb = async (video : {id : string, name : string , file : File}) => {
    const db = await getDB();

    await db.put('videos', video);
}
 
const getAllVideosFromDB = async () => {
    const db = await getDB();
    const allVideos = await db.getAll('videos');
    return allVideos;
}

const updateVideoNameInDB = async ({id, newName} : {id : string; newName : string}) => {
    const db = await getDB();
    const video = await db.get('videos',id);

    if(video) {
        video.name = newName;
        await db.put('videos',video);
    }
}


export {getDB, addVideoToDb, getAllVideosFromDB, updateVideoNameInDB}
