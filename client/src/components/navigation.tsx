import { useState } from "react";
import { Leaf, User, Settings, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApiKeyModal from "@/components/api-key-modal";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "calculator", label: "Calculator" },
    { id: "credits", label: "Carbon Credits" },
    { id: "ai-agent", label: "AI Assistant" },
    { id: "policies", label: "Policies" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="text-climate-green text-2xl mr-3" size={24} />
              <span className="text-xl font-bold text-neutral-900">Climate Action AI</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-ibm-blue text-white"
                        : "text-neutral-700 hover:text-ibm-blue hover:bg-blue-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-ibm-blue text-white hover:bg-blue-700 flex items-center">
                  <User className="mr-2" size={16} />
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setIsApiKeyModalOpen(true)}>
                  <Key className="mr-2" size={16} />
                  <span>Manage API Keys</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2" size={16} />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
      />
    </nav>
  );
}
