import VideoList from "@/components/VideoList";
import VideoUpload from "@/components/VideoUpload";


export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <VideoUpload />
      <VideoList />
    </main>
  );
}
