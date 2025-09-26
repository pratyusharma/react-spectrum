import { X, Lock } from 'lucide-react';

interface TagChipProps {
  label: string;
  onRemove?: () => void;
  locked?: boolean;
  faded?: boolean;
}

export function TagChip({ label, onRemove, locked = false, faded = false }: TagChipProps) {
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1 rounded border transition-all ${
        faded 
          ? 'bg-[#323232] border-[#444] text-[#666] opacity-50' 
          : 'bg-[#2A2A2A] border-[#31A8FF] text-[#EAEAEA] hover:bg-[#323232]'
      }`}
    >
      <span className="text-sm">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-[#B5B5B5] hover:text-[#EAEAEA] transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}