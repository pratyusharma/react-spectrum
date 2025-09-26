import { Search, Cloud, User } from 'lucide-react';
import psIcon from 'figma:asset/0ec7736798cdeaba12a5f917ef5b17917b13ad77.png';

export function TopBar() {
  const menuItems = ['File', 'Edit', 'Image', 'Layer', 'Select', 'Filter', 'View', 'Window', 'Help'];
  
  return (
    <div className="h-14 bg-[#2B2B2B] border-b border-[#444] flex items-center px-4">
      {/* Left - PS Icon */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded overflow-hidden">
          <img src={psIcon} alt="Photoshop" className="w-full h-full object-cover" />
        </div>
        
        {/* Menu Items */}
        <nav className="flex items-center gap-6">
          {menuItems.map((item) => (
            <button 
              key={item}
              className="text-[#EAEAEA] hover:text-[#31A8FF] transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Right - Controls */}
      <div className="ml-auto flex items-center gap-4">
        <button className="text-[#B5B5B5] hover:text-[#EAEAEA] transition-colors">
          <Search size={16} />
        </button>
        <button className="text-[#B5B5B5] hover:text-[#EAEAEA] transition-colors">
          <Cloud size={16} />
        </button>
        <div className="w-6 h-6 bg-[#31A8FF] rounded-full flex items-center justify-center">
          <User size={12} className="text-white" />
        </div>
      </div>
    </div>
  );
}