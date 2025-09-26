import { RotateCcw, Sun, Contrast, Palette, Crop, Zap, Aperture, Focus, Thermometer, Eye, Scissors, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { TagChip } from './TagChip';

export function Sidebar() {
  const tags = [
    { label: 'Portrait', faded: false },
    { label: 'Web', faded: true }, // This one was just removed
    { label: 'Approved', faded: false },
    { label: 'CC-BY', faded: false },
    { label: 'Hero', faded: false },
    { label: 'To Review', faded: false },
    { label: 'RGB', faded: false },
    { label: 'Daylight', faded: false },
    { label: '16:9', faded: false },
  ];

  return (
    <div className="w-80 bg-[#323232] border-l border-[#444] flex flex-col overflow-y-auto">
      {/* Properties Header */}
      <div className="p-4 border-b border-[#444]">
        <h3 className="text-[#EAEAEA]">Properties</h3>
      </div>
      
      {/* Tags Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[#EAEAEA]">Tags</h4>
          <button className="flex items-center gap-2 px-3 py-1 bg-[#31A8FF] text-white rounded hover:bg-[#2690D9] transition-colors">
            <RotateCcw size={14} />
            Undo
          </button>
        </div>
        
        {/* Tag Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <TagChip
              key={tag.label}
              label={tag.label}
              faded={tag.faded}
              onRemove={() => {}}
            />
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-[#444] my-4"></div>
        
        {/* Basic Adjustments */}
        <div className="space-y-4">
          <h4 className="text-[#EAEAEA]">Basic Adjustments</h4>
          
          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun size={14} className="text-[#B5B5B5]" />
                <span className="text-[#EAEAEA] text-sm">Brightness</span>
              </div>
              <span className="text-[#B5B5B5] text-sm">+12</span>
            </div>
            <div className="w-full h-1 bg-[#444] rounded">
              <div className="w-3/5 h-full bg-[#31A8FF] rounded"></div>
            </div>
          </div>
          
          {/* Contrast */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast size={14} className="text-[#B5B5B5]" />
                <span className="text-[#EAEAEA] text-sm">Contrast</span>
              </div>
              <span className="text-[#B5B5B5] text-sm">+8</span>
            </div>
            <div className="w-full h-1 bg-[#444] rounded">
              <div className="w-2/5 h-full bg-[#31A8FF] rounded"></div>
            </div>
          </div>
          
          {/* Saturation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette size={14} className="text-[#B5B5B5]" />
                <span className="text-[#EAEAEA] text-sm">Saturation</span>
              </div>
              <span className="text-[#B5B5B5] text-sm">-5</span>
            </div>
            <div className="w-full h-1 bg-[#444] rounded">
              <div className="w-1/3 h-full bg-[#31A8FF] rounded"></div>
            </div>
          </div>

          {/* Exposure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Aperture size={14} className="text-[#B5B5B5]" />
                <span className="text-[#EAEAEA] text-sm">Exposure</span>
              </div>
              <span className="text-[#B5B5B5] text-sm">+0.3</span>
            </div>
            <div className="w-full h-1 bg-[#444] rounded">
              <div className="w-1/2 h-full bg-[#31A8FF] rounded"></div>
            </div>
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer size={14} className="text-[#B5B5B5]" />
                <span className="text-[#EAEAEA] text-sm">Temperature</span>
              </div>
              <span className="text-[#B5B5B5] text-sm">5400K</span>
            </div>
            <div className="w-full h-1 bg-[#444] rounded">
              <div className="w-3/4 h-full bg-[#31A8FF] rounded"></div>
            </div>
          </div>

          {/* Vibrance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-[#B5B5B5]" />
                <span className="text-[#EAEAEA] text-sm">Vibrance</span>
              </div>
              <span className="text-[#B5B5B5] text-sm">+15</span>
            </div>
            <div className="w-full h-1 bg-[#444] rounded">
              <div className="w-2/3 h-full bg-[#31A8FF] rounded"></div>
            </div>
          </div>
        </div>

        {/* Transform Section */}
        <div className="border-t border-[#444] my-4 pt-4 space-y-4">
          <h4 className="text-[#EAEAEA]">Transform</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-center gap-2 py-2 bg-[#2A2A2A] border border-[#444] rounded">
              <RotateCw size={14} className="text-[#B5B5B5]" />
              <span className="text-[#EAEAEA] text-sm">Rotate</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-[#2A2A2A] border border-[#444] rounded">
              <FlipHorizontal size={14} className="text-[#B5B5B5]" />
              <span className="text-[#EAEAEA] text-sm">Flip H</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-[#2A2A2A] border border-[#444] rounded">
              <FlipVertical size={14} className="text-[#B5B5B5]" />
              <span className="text-[#EAEAEA] text-sm">Flip V</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-[#2A2A2A] border border-[#444] rounded">
              <Scissors size={14} className="text-[#B5B5B5]" />
              <span className="text-[#EAEAEA] text-sm">Trim</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-[#444] my-4 pt-4 space-y-4">
          <h4 className="text-[#EAEAEA]">Quick Actions</h4>
          
          <div className="flex gap-2">
            <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#2A2A2A] border border-[#444] rounded">
              <Crop size={14} className="text-[#B5B5B5]" />
              <span className="text-[#EAEAEA] text-sm">Crop</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#2A2A2A] border border-[#444] rounded">
              <Zap size={14} className="text-[#B5B5B5]" />
              <span className="text-[#EAEAEA] text-sm">Auto</span>
            </div>
          </div>
          
          {/* Reset Button */}
          <div className="w-full flex items-center justify-center gap-2 py-2 bg-[#444] border border-[#666] rounded">
            <RotateCcw size={14} className="text-[#B5B5B5]" />
            <span className="text-[#EAEAEA] text-sm">Reset All</span>
          </div>
        </div>

        {/* Image Info */}
        <div className="border-t border-[#444] my-4 pt-4 space-y-2">
          <h4 className="text-[#EAEAEA]">Image Info</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[#B5B5B5]">Dimensions:</span>
              <span className="text-[#EAEAEA]">3840 × 2160</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B5B5B5]">Size:</span>
              <span className="text-[#EAEAEA]">12.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B5B5B5]">Format:</span>
              <span className="text-[#EAEAEA]">JPEG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B5B5B5]">Color Space:</span>
              <span className="text-[#EAEAEA]">sRGB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}