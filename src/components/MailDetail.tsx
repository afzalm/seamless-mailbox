
import { useState, useEffect } from 'react';
import { ArrowLeft, Star, StarIcon, Reply, MoreHorizontal, Trash, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Mail } from './MailList';
import { cn } from '@/lib/utils';

interface MailDetailProps {
  mail: Mail | null;
  onBack: () => void;
}

export function MailDetail({ mail, onBack }: MailDetailProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (mail) {
      setIsStarred(mail.isStarred);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [mail]);
  
  if (!mail) {
    return (
      <div className="glass-panel flex-1 flex items-center justify-center rounded-br-xl">
        <div className="text-center text-mail-500">
          <p className="text-lg font-medium">Select an email to view</p>
          <p className="text-sm">Choose an email from the list to view its contents</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "glass-panel flex-1 flex flex-col overflow-hidden rounded-br-xl",
      isAnimating ? "animate-slide-right" : ""
    )}>
      <div className="flex items-center justify-between p-4 border-b border-mail-200">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-mail-200"
          >
            <ArrowLeft className="h-5 w-5 text-mail-600" />
          </Button>
          <span className="font-medium">{mail.subject}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsStarred(!isStarred)}
            className="rounded-full hover:bg-mail-200"
          >
            {isStarred ? (
              <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="h-5 w-5 text-mail-600" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-mail-200"
          >
            <Reply className="h-5 w-5 text-mail-600" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-mail-200"
          >
            <Archive className="h-5 w-5 text-mail-600" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-mail-200"
          >
            <Trash className="h-5 w-5 text-mail-600" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-mail-200"
          >
            <MoreHorizontal className="h-5 w-5 text-mail-600" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={mail.from.avatar} />
                  <AvatarFallback className="bg-mail-300 text-mail-700">
                    {mail.from.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{mail.from.name}</span>
                    <span className="text-xs text-mail-500">&lt;{mail.from.email}&gt;</span>
                  </div>
                  <div className="text-xs text-mail-500">
                    to me
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-mail-500">
                {format(mail.date, 'MMM d, yyyy, h:mm a')}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-mail-800 space-y-4">
            <h1 className="text-xl font-medium">{mail.subject}</h1>
            
            <div className="space-y-4">
              <p>Hello,</p>
              
              <p>{mail.preview}</p>
              
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, vel aliquam nunc nisl vel nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, vel aliquam nunc nisl vel nunc.</p>
              
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              
              {mail.hasAttachment && (
                <div className="mt-6">
                  <p className="mb-2 text-sm font-medium">Attachments</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-16 w-20 items-center justify-center rounded-md border border-mail-200 bg-mail-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mail-500">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Document.pdf</p>
                      <p className="text-xs text-mail-500">2.4 MB</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <p>Best regards,</p>
                <p>{mail.from.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
