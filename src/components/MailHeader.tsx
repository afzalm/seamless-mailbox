
import { Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MailHeader() {
  return (
    <header className="glass-panel flex h-16 items-center justify-between gap-4 px-6 rounded-tr-xl">
      <div className="flex items-center">
        <span className="text-xl font-semibold text-blue-500 mr-10">Mail</span>
      </div>
      
      <div className="flex-1 max-w-lg relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-mail-500" />
        </div>
        <Input 
          className="bg-mail-100 border-none pl-10 w-full h-9 focus-visible:ring-1 focus-visible:ring-blue-500"
          placeholder="Search mail..."
        />
      </div>
      
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-mail-200 transition-all duration-200">
          <Bell className="h-5 w-5 text-mail-600" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500"></span>
        </button>
        
        <Avatar className="h-8 w-8 transition-transform hover:scale-105">
          <AvatarImage src="https://i.pravatar.cc/300" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
