import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import ResumeSections from "@/components/ResumeSections";
import ContactWidget from "@/components/ContactWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col w-full relative">
      <div className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Projects />
      <ResumeSections />
      <ContactWidget />
    </main>
  );
}
