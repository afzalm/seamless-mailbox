
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Palette className="h-5 w-5 text-mail-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => { setTheme('blue'); setOpen(false); }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="h-4 w-4 rounded-full bg-blue-500" />
          <span className={theme === 'blue' ? 'font-medium' : ''}>Blue</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => { setTheme('teal'); setOpen(false); }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="h-4 w-4 rounded-full bg-teal-500" />
          <span className={theme === 'teal' ? 'font-medium' : ''}>Teal</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => { setTheme('dark'); setOpen(false); }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="h-4 w-4 rounded-full bg-gray-800" />
          <span className={theme === 'dark' ? 'font-medium' : ''}>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
