
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bold, Italic, Underline, AlignLeft, 
  AlignCenter, AlignRight, List, ListOrdered, 
  Link, Paperclip, Send, Image, Code, Quote, Trash,
  X, ChevronLeft
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComposeEmail({ isOpen, onClose }: ComposeEmailProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isRequestingAiAssist, setIsRequestingAiAssist] = useState(false);
  const [isAiAssistOpen, setIsAiAssistOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const isMobile = useIsMobile();

  const handleSend = () => {
    // In a real app, this would send the email
    console.log({ to, subject, content });
    onClose();
  };

  const applyFormatting = (format: string) => {
    // Simple implementation of text formatting
    // In a real app, this would apply formatting to the selected text
    // or insert the formatting at the cursor position
    switch (format) {
      case 'bold':
        setContent(content + '**bold text**');
        break;
      case 'italic':
        setContent(content + '*italic text*');
        break;
      case 'underline':
        setContent(content + '_underlined text_');
        break;
      case 'list':
        setContent(content + '\n- Item 1\n- Item 2\n- Item 3');
        break;
      case 'ordered-list':
        setContent(content + '\n1. Item 1\n2. Item 2\n3. Item 3');
        break;
      case 'link':
        setContent(content + '[link text](https://example.com)');
        break;
      case 'quote':
        setContent(content + '\n> Quoted text here');
        break;
      case 'code':
        setContent(content + '\n```\nCode block\n```');
        break;
      default:
        break;
    }
  };

  const generateAiAssist = () => {
    setIsRequestingAiAssist(true);
    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      setAiSuggestion(
        aiPrompt.toLowerCase().includes('professional') 
          ? "I hope this email finds you well. I wanted to reach out regarding our upcoming project timeline. Based on our recent progress, I believe we are on track to meet our quarterly objectives."
          : "Hey there! Just checking in about our project. Things are looking good so far, and I think we're going to hit our targets for the quarter."
      );
      setIsRequestingAiAssist(false);
    }, 1000);
  };

  const applyAiSuggestion = () => {
    setContent(aiSuggestion);
    setIsAiAssistOpen(false);
  };

  const EmailComposeContent = () => (
    <div className="flex flex-col h-full">
      <div className="border-b px-4 py-3 flex items-center justify-between">
        {isMobile && (
          <button onClick={onClose} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <h2 className="text-lg font-medium">{isMobile ? "Compose" : "New Message"}</h2>
        {isMobile ? (
          <div className="flex items-center">
            <button onClick={handleSend} className="p-1">
              <Send className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-1 ml-2">
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b">
          <Input 
            type="email" 
            placeholder="To" 
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border-0 focus-visible:ring-0 px-0 py-1 text-sm"
          />
        </div>
        
        <div className="px-4 py-3 border-b">
          <Input 
            type="text" 
            placeholder="Subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-0 focus-visible:ring-0 px-0 py-1 text-sm"
          />
        </div>
        
        {!isMobile && (
          <div className="px-4 py-3 border-b flex flex-wrap gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-8 mx-1" />
            
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <AlignRight className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-8 mx-1" />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('ordered-list')}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-8 mx-1" />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('link')}
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Image className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('code')}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => applyFormatting('quote')}
            >
              <Quote className="h-4 w-4" />
            </Button>
            
            <div className="flex-1"></div>
            
            <Dialog open={isAiAssistOpen} onOpenChange={setIsAiAssistOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  AI Assist
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Email Assistant</DialogTitle>
                  <DialogDescription>
                    Describe what kind of email you want to write, and our AI will help you compose it.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea 
                    placeholder="e.g., Write a professional email to schedule a meeting with the design team"
                    className="min-h-[100px]"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button 
                    onClick={generateAiAssist} 
                    disabled={isRequestingAiAssist || !aiPrompt.trim()}
                    className="w-full"
                  >
                    {isRequestingAiAssist ? "Generating..." : "Generate Email"}
                  </Button>
                  
                  {aiSuggestion && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Suggestion:</h4>
                      <div className="bg-secondary p-3 rounded-md text-sm">
                        {aiSuggestion}
                      </div>
                      <Button 
                        onClick={applyAiSuggestion}
                        className="w-full mt-4"
                      >
                        Use This Text
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        
        {isMobile && (
          <div className="px-4 py-2 border-b flex overflow-x-auto gap-1 no-scrollbar">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('ordered-list')}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('link')}
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('quote')}
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 shrink-0" 
              onClick={() => applyFormatting('code')}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    Upload from device
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Google Drive
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        <div className="flex-1 px-4 py-2 overflow-auto">
          <Textarea 
            placeholder="Compose your email..."
            className="min-h-[200px] border-0 resize-none focus-visible:ring-0 p-0 flex-1 h-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      
      {!isMobile && (
        <div className="border-t p-4 flex justify-between">
          <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Attachments</h4>
                    <p className="text-sm text-muted-foreground">
                      Attach files to your email
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Button variant="outline" className="w-full justify-start">
                      Upload from computer
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Google Drive
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="icon" onClick={onClose}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="h-[95vh] rounded-t-xl">
          <EmailComposeContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] p-0 flex flex-col h-full">
        <EmailComposeContent />
      </SheetContent>
    </Sheet>
  );
}
