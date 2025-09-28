import { TopBar } from "./components/TopBar";
import { SubTabBar } from "./components/SubTabBar";
import { ToolColumn } from "./components/ToolColumn";
import { Canvas } from "./components/Canvas";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="w-[1440px] h-[900px] bg-[#2B2B2B] flex flex-col font-['Arial'] overflow-hidden">
      {/* Top App Bar */}
      <TopBar />

      {/* Sub Tab Bar */}
      <SubTabBar />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Tool Column */}
        <ToolColumn />

        {/* Center Canvas */}
        <Canvas />

        {/* Right Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}