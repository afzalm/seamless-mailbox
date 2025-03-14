
import { useState } from 'react';
import { 
  Inbox, Send, Star, File, Trash, Edit,
  ChevronDown, Settings, Search, Plus,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ComposeEmail } from './ComposeEmail';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ icon, label, count, isActive, onClick }: SidebarLinkProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
      isActive 
        ? "bg-blue-100 text-blue-600" 
        : "text-mail-800 hover:bg-mail-200"
    )}
  >
    <div className="flex items-center gap-3">
      <div className={cn(
        "h-5 w-5",
        isActive ? "text-blue-600" : "text-mail-600"
      )}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span className={cn(
        "text-xs font-medium",
        isActive ? "text-blue-600" : "text-mail-600"
      )}>
        {count}
      </span>
    )}
  </button>
);

export function MailSidebar() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <Button 
          className="w-full justify-start gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={() => {
            setIsComposeOpen(true);
            if (isMobile) setIsSidebarOpen(false);
          }}
        >
          <Edit className="h-4 w-4" />
          <span>Compose</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto px-2 py-3 space-y-1">
        <SidebarLink 
          icon={<Inbox />} 
          label="Inbox" 
          count={14} 
          isActive={activeFolder === 'inbox'} 
          onClick={() => {
            setActiveFolder('inbox');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        <SidebarLink 
          icon={<Star />} 
          label="Starred" 
          count={3} 
          isActive={activeFolder === 'starred'} 
          onClick={() => {
            setActiveFolder('starred');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        <SidebarLink 
          icon={<Send />} 
          label="Sent" 
          isActive={activeFolder === 'sent'} 
          onClick={() => {
            setActiveFolder('sent');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        <SidebarLink 
          icon={<File />} 
          label="Drafts" 
          count={2} 
          isActive={activeFolder === 'drafts'} 
          onClick={() => {
            setActiveFolder('drafts');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        <SidebarLink 
          icon={<Trash />} 
          label="Trash" 
          isActive={activeFolder === 'trash'} 
          onClick={() => {
            setActiveFolder('trash');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        
        <div className="mt-6 mb-2 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-mail-500">LABELS</span>
            <button className="rounded-full p-1 hover:bg-mail-200 transition-all duration-200">
              <Plus className="h-3 w-3 text-mail-500" />
            </button>
          </div>
        </div>
        
        <SidebarLink 
          icon={<div className="h-3 w-3 rounded-full bg-blue-500 ml-1" />} 
          label="Work" 
          isActive={activeFolder === 'work'} 
          onClick={() => {
            setActiveFolder('work');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        <SidebarLink 
          icon={<div className="h-3 w-3 rounded-full bg-green-500 ml-1" />} 
          label="Personal" 
          isActive={activeFolder === 'personal'} 
          onClick={() => {
            setActiveFolder('personal');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
        <SidebarLink 
          icon={<div className="h-3 w-3 rounded-full bg-purple-500 ml-1" />} 
          label="Finance" 
          isActive={activeFolder === 'finance'} 
          onClick={() => {
            setActiveFolder('finance');
            if (isMobile) setIsSidebarOpen(false);
          }}
        />
      </div>
      
      <div className="mt-auto p-4 border-t border-mail-200">
        <div className="flex items-center justify-between text-mail-600">
          <Settings className="h-5 w-5" />
          <span className="text-xs">1.2 GB of 15 GB used</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {isMobile ? (
        <Drawer open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <DrawerTrigger asChild className="md:hidden absolute left-4 top-4 z-10">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] rounded-t-xl">
            <div className="glass-panel h-full overflow-auto">
              <SidebarContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <div className="glass-panel h-full w-64 flex flex-col rounded-l-xl">
          <SidebarContent />
        </div>
      )}
      
      <ComposeEmail 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
    </>
  );
}
