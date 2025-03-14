
import { useState } from 'react';
import { 
  Star, StarIcon, Archive, Trash, MailOpen,
  Clock, Tag, MoreHorizontal 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export interface Mail {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  date: Date;
  isStarred: boolean;
  isRead: boolean;
  labels?: string[];
  hasAttachment?: boolean;
}

const mailData: Mail[] = [
  {
    id: '1',
    from: {
      name: 'Apple',
      email: 'noreply@apple.com',
      avatar: 'https://i.pravatar.cc/100?u=apple',
    },
    subject: 'Your Apple ID was used to sign in to iCloud',
    preview: 'Your Apple ID (example@gmail.com) was used to sign in to iCloud via a web browser. Date and Time: April 29, 2023 at 10:14 AM UTC',
    date: new Date(2023, 3, 29, 10, 14),
    isStarred: false,
    isRead: false,
    labels: ['work'],
  },
  {
    id: '2',
    from: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'https://i.pravatar.cc/100?u=sarah',
    },
    subject: 'Project status update - Week 17',
    preview: 'Hi team, I wanted to share our progress for this week. We\'ve completed the initial design phase and are now moving to development.',
    date: new Date(2023, 3, 28, 16, 45),
    isStarred: true,
    isRead: true,
    labels: ['work'],
  },
  {
    id: '3',
    from: {
      name: 'Dropbox',
      email: 'no-reply@dropbox.com',
      avatar: 'https://i.pravatar.cc/100?u=dropbox',
    },
    subject: 'James shared "Q1 Financial Report" with you',
    preview: 'James Smith (james.smith@company.com) shared an item with you: "Q1 Financial Report.xlsx" (5.2 MB)',
    date: new Date(2023, 3, 28, 11, 22),
    isStarred: false,
    isRead: true,
    hasAttachment: true,
    labels: ['finance'],
  },
  {
    id: '4',
    from: {
      name: 'Alex Williams',
      email: 'alex.w@example.com',
      avatar: 'https://i.pravatar.cc/100?u=alex',
    },
    subject: 'Weekend plans?',
    preview: 'Hey! A few of us are planning to go hiking this weekend at Redwood National Park. Would you be interested in joining?',
    date: new Date(2023, 3, 27, 19, 34),
    isStarred: true,
    isRead: false,
    labels: ['personal'],
  },
  {
    id: '5',
    from: {
      name: 'Twitter',
      email: 'info@twitter.com',
      avatar: 'https://i.pravatar.cc/100?u=twitter',
    },
    subject: 'New login to Twitter from Chrome on Mac',
    preview: 'We noticed a login to your account @username from a new device. Location: San Francisco, CA, USA',
    date: new Date(2023, 3, 27, 15, 10),
    isStarred: false,
    isRead: true,
  },
  {
    id: '6',
    from: {
      name: 'LinkedIn',
      email: 'messages-noreply@linkedin.com',
      avatar: 'https://i.pravatar.cc/100?u=linkedin',
    },
    subject: 'Michael Chen has accepted your connection request',
    preview: 'You and Michael Chen are now connected. Browse jobs of interest: Software Developer, Senior Frontend Engineer, React Developer',
    date: new Date(2023, 3, 26, 13, 45),
    isStarred: false,
    isRead: true,
  },
  {
    id: '7',
    from: {
      name: 'Emma Davis',
      email: 'emma.d@example.com',
      avatar: 'https://i.pravatar.cc/100?u=emma',
    },
    subject: 'Dinner this Friday?',
    preview: 'Hi there! I was wondering if you'd like to grab dinner this Friday? There's a new Italian restaurant downtown that I've been wanting to try.',
    date: new Date(2023, 3, 26, 11, 23),
    isStarred: false,
    isRead: true,
    labels: ['personal'],
  },
  {
    id: '8',
    from: {
      name: 'GitHub',
      email: 'noreply@github.com',
      avatar: 'https://i.pravatar.cc/100?u=github',
    },
    subject: '[GitHub] A new commit was pushed to main in your-repo',
    preview: 'A new commit was pushed to branch main in your-repo by user123: "Fix navigation bug in production #435"',
    date: new Date(2023, 3, 25, 22, 17),
    isStarred: false,
    isRead: true,
    labels: ['work'],
  },
  {
    id: '9',
    from: {
      name: 'Jessica Miller',
      email: 'jessica.m@example.com',
      avatar: 'https://i.pravatar.cc/100?u=jessica',
    },
    subject: 'Photos from the company retreat',
    preview: 'Hi all, I've uploaded the photos from our company retreat last week. You can download them from the shared drive.',
    date: new Date(2023, 3, 25, 16, 9),
    isStarred: true,
    isRead: true,
    hasAttachment: true,
    labels: ['work'],
  },
  {
    id: '10',
    from: {
      name: 'Spotify',
      email: 'no-reply@spotify.com',
      avatar: 'https://i.pravatar.cc/100?u=spotify',
    },
    subject: 'Your weekly mix is ready',
    preview: 'Your Weekly Mix is ready! Listen to 30 tracks we picked based on your listening history and more.',
    date: new Date(2023, 3, 24, 10, 12),
    isStarred: false,
    isRead: true,
  },
];

function formatMailDate(date: Date): string {
  const now = new Date();
  const isToday = date.getDate() === now.getDate() &&
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return format(date, 'h:mm a');
  } else {
    return format(date, 'MMM d');
  }
}

export function MailList({ onSelectMail }: { onSelectMail: (mail: Mail) => void }) {
  const [emails, setEmails] = useState<Mail[]>(mailData);
  
  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };
  
  const markAsRead = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isRead: true } : email
    ));
  };
  
  return (
    <div className="glass-panel flex-1 flex flex-col overflow-hidden rounded-br-xl">
      <div className="flex items-center justify-between p-4 border-b border-mail-200">
        <div className="flex items-center space-x-4">
          <Checkbox className="rounded-sm h-4 w-4 border-mail-400" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mail-button p-1">
                  <Archive className="mail-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mail-button p-1">
                  <Trash className="mail-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mail-button p-1">
                  <MailOpen className="mail-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Mark as read</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="h-5 bg-mail-200" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mail-button p-1">
                  <Clock className="mail-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mail-button p-1">
                  <Tag className="mail-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Labels</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mail-button p-1">
                  <MoreHorizontal className="mail-icon" />
                </button>
              </TooltipTrigger>
              <TooltipContent>More</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="animate-fade-in">
          {emails.map((email, index) => (
            <div
              key={email.id}
              className={cn(
                "mail-item animate-slide-up",
                !email.isRead && "mail-item-unread bg-blue-100/40"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => {
                markAsRead(email.id);
                onSelectMail(email);
              }}
            >
              <Checkbox className="rounded-sm h-4 w-4 shrink-0 border-mail-400" />
              
              <button
                className="shrink-0"
                onClick={(e) => toggleStar(email.id, e)}
              >
                {email.isStarred ? (
                  <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star className="h-5 w-5 text-mail-400 hover:text-mail-600" />
                )}
              </button>
              
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={email.from.avatar} />
                <AvatarFallback className="bg-mail-300 text-mail-700">
                  {email.from.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 truncate">
                  <span className={cn(
                    "truncate text-sm",
                    !email.isRead && "font-semibold text-mail-900"
                  )}>
                    {email.from.name}
                  </span>
                  
                  {email.labels && email.labels.map(label => {
                    const labelColor = 
                      label === 'work' ? 'bg-blue-500' :
                      label === 'personal' ? 'bg-green-500' :
                      label === 'finance' ? 'bg-purple-500' : 'bg-gray-500';
                    
                    return (
                      <span
                        key={label}
                        className={`inline-block h-2 w-2 rounded-full ${labelColor}`}
                      />
                    );
                  })}
                </div>
                
                <div className="flex items-baseline gap-1 truncate">
                  <span className={cn(
                    "truncate text-sm",
                    !email.isRead ? "font-semibold text-mail-900" : "text-mail-600"
                  )}>
                    {email.subject}
                  </span>
                  <span className="truncate text-sm text-mail-500">
                    - {email.preview}
                  </span>
                </div>
              </div>
              
              <div className="flex shrink-0 items-center gap-2">
                {email.hasAttachment && (
                  <div className="h-5 w-5 text-mail-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </div>
                )}
                <span className={cn(
                  "whitespace-nowrap text-xs",
                  !email.isRead ? "font-semibold text-mail-900" : "text-mail-500"
                )}>
                  {formatMailDate(email.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
