// Header.tsx
import { Menu } from "lucide-react";

// Prop define karein
const Header = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  return (
    <header className="flex items-center p-4 bg-gray-950 border-b border-gray-800 md:hidden">
      <button 
        onClick={() => setOpen(true)} // Prop wala function use karein
        className="text-white hover:text-blue-500"
      >
        <Menu size={24} />
      </button>
      <span className="ml-4 font-bold text-lg">Task Orbit</span>
    </header>
  );
};

export default Header;