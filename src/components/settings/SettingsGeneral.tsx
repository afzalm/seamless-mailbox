
import { useState } from 'react';
import { Bold, Italic, Underline, Link, Image, AlignLeft, AlignCenter, AlignRight, Save, ChevronDown, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Signature {
  id: string;
  name: string;
  content: string;
  isDefault: boolean;
}

export function SettingsGeneral() {
  const [signatures, setSignatures] = useState<Signature[]>([
    {
      id: '1',
      name: 'Work Signature',
      content: 'John Doe<br>Product Manager<br>Company Inc.',
      isDefault: true
    },
    {
      id: '2',
      name: 'Personal Signature',
      content: 'Best regards,<br>John',
      isDefault: false
    }
  ]);
  
  const [currentSignature, setCurrentSignature] = useState<Signature | null>(signatures[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editContent, setEditContent] = useState('');
  
  const startEditing = (signature: Signature) => {
    setCurrentSignature(signature);
    setEditName(signature.name);
    setEditContent(signature.content);
    setIsEditing(true);
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
    setEditName('');
    setEditContent('');
  };
  
  const saveSignature = () => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Signature name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (currentSignature) {
      // Update existing signature
      setSignatures(signatures.map(sig => 
        sig.id === currentSignature.id 
          ? { ...sig, name: editName, content: editContent } 
          : sig
      ));
      toast({
        title: "Success",
        description: "Signature updated successfully",
      });
    } else {
      // Create new signature
      const newSignature: Signature = {
        id: Date.now().toString(),
        name: editName,
        content: editContent,
        isDefault: signatures.length === 0 // First signature is default
      };
      setSignatures([...signatures, newSignature]);
      toast({
        title: "Success",
        description: "New signature created successfully",
      });
    }
    
    setIsEditing(false);
    setEditName('');
    setEditContent('');
  };
  
  const createNewSignature = () => {
    setCurrentSignature(null);
    setEditName('');
    setEditContent('');
    setIsEditing(true);
  };
  
  const deleteSignature = (id: string) => {
    if (signatures.length === 1) {
      toast({
        title: "Error",
        description: "You must have at least one signature",
        variant: "destructive",
      });
      return;
    }
    
    const signatureToDelete = signatures.find(sig => sig.id === id);
    
    // If deleting the default signature, make another one default
    if (signatureToDelete?.isDefault) {
      const newDefault = signatures.find(sig => sig.id !== id);
      if (newDefault) {
        setSignatures(
          signatures
            .filter(sig => sig.id !== id)
            .map(sig => sig.id === newDefault.id ? {...sig, isDefault: true} : sig)
        );
      }
    } else {
      setSignatures(signatures.filter(sig => sig.id !== id));
    }
    
    toast({
      title: "Success",
      description: "Signature deleted successfully",
    });
    
    if (currentSignature?.id === id) {
      cancelEditing();
    }
  };
  
  const setAsDefault = (id: string) => {
    setSignatures(signatures.map(sig => ({
      ...sig,
      isDefault: sig.id === id
    })));
    
    toast({
      title: "Success",
      description: "Default signature updated",
    });
  };
  
  const formatText = (format: string) => {
    switch (format) {
      case 'bold':
        setEditContent(editContent + '<b>text</b>');
        break;
      case 'italic':
        setEditContent(editContent + '<i>text</i>');
        break;
      case 'underline':
        setEditContent(editContent + '<u>text</u>');
        break;
      case 'link':
        setEditContent(editContent + '<a href="https://example.com">link text</a>');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Signature</h2>
        <p className="text-sm text-mail-600">
          Create and manage email signatures that can be added to the end of your messages.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Signature list */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">My signatures</h3>
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-1"
                onClick={createNewSignature}
              >
                <Plus className="h-3.5 w-3.5" />
                New
              </Button>
            </div>
            
            <div className="space-y-2 mt-2">
              {signatures.map((signature) => (
                <div 
                  key={signature.id} 
                  className={`p-3 border rounded-md cursor-pointer transition-colors
                    ${currentSignature?.id === signature.id && isEditing ? 'border-blue-500 bg-blue-50' : 'border-mail-200 hover:bg-mail-100'}`}
                  onClick={() => startEditing(signature)}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{signature.name}</p>
                      {signature.isDefault && (
                        <span className="text-xs text-mail-600 mt-1">Default</span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-mail-600 hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSignature(signature.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Signature editor */}
          <div className="w-full md:w-2/3 border rounded-md p-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">
                    {currentSignature ? 'Edit signature' : 'Create new signature'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={cancelEditing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-mail-200 px-3 py-2 text-sm"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Signature name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Content</label>
                  
                  <div className="border border-mail-200 rounded-md">
                    <div className="flex flex-wrap gap-1 p-2 border-b border-mail-200 overflow-x-auto">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => formatText('bold')}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => formatText('italic')}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => formatText('underline')}
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => formatText('link')}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                      <div className="border-r border-mail-200 h-8 mx-1"></div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="Enter your signature text here..."
                      className="min-h-[150px] border-none rounded-none focus-visible:ring-0"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <div className="border rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">Preview</h4>
                      <div 
                        className="p-3 border rounded-md min-h-[80px] text-sm"
                        dangerouslySetInnerHTML={{ __html: editContent }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      {currentSignature && !currentSignature.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setAsDefault(currentSignature.id)}
                        >
                          Set as default
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={saveSignature}
                        className="gap-1"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-mail-600">
                  {signatures.length > 0 
                    ? "Select a signature to edit or create a new one" 
                    : "No signatures yet. Create your first signature to get started."}
                </p>
                {signatures.length === 0 && (
                  <Button 
                    className="mt-4"
                    onClick={createNewSignature}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Signature
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Default reply behavior</h2>
        <div className="max-w-lg">
          <Select defaultValue="reply">
            <SelectTrigger>
              <SelectValue placeholder="Select reply behavior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reply">Reply</SelectItem>
              <SelectItem value="replyAll">Reply All</SelectItem>
              <SelectItem value="forward">Forward</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
