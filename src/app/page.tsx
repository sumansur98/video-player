import VideoList from "@/components/VideoList";
import VideoUpload from "@/components/VideoUpload";


export default function Home() {
  return (
    <div>
      <VideoUpload />
      <VideoList />
    </div>
  );
}
