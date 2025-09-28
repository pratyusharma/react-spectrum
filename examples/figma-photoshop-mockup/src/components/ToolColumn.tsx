import { MousePointer, Square, Brush, Type, Crop, Pipette, Hand, ZoomIn } from 'lucide-react';

export function ToolColumn() {
  const tools = [
    { icon: MousePointer, active: true },
    { icon: Square, active: false },
    { icon: Brush, active: false },
    { icon: Type, active: false },
    { icon: Crop, active: false },
    { icon: Pipette, active: false },
    { icon: Hand, active: false },
    { icon: ZoomIn, active: false },
  ];
  
  return (
    <div className="w-14 bg-[#323232] border-r border-[#444] flex flex-col items-center py-2 gap-1">
      {tools.map((tool, index) => (
        <button
          key={index}
          className={`w-10 h-10 flex items-center justify-center rounded hover:bg-[#444] transition-colors ${
            tool.active ? 'bg-[#31A8FF] text-white' : 'text-[#B5B5B5]'
          }`}
        >
          <tool.icon size={16} />
        </button>
      ))}
    </div>
  );
}