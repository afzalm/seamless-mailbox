
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function SettingsAdvanced() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Display Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Density</h3>
              <p className="text-sm text-mail-600">
                Choose how compact you want your email list to appear
              </p>
            </div>
            <div className="w-40">
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue placeholder="Select density" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Show reading pane</h3>
              <p className="text-sm text-mail-600">
                Display message content alongside your email list
              </p>
            </div>
            <div className="w-40">
              <Select defaultValue="right">
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No split</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Email Handling</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-advance</h3>
              <p className="text-sm text-mail-600">
                After archiving or deleting a conversation
              </p>
            </div>
            <div className="w-40">
              <Select defaultValue="newer">
                <SelectTrigger>
                  <SelectValue placeholder="Select behavior" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newer">Go to newer</SelectItem>
                  <SelectItem value="older">Go to older</SelectItem>
                  <SelectItem value="messagelist">Back to list</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Keyboard shortcuts</h3>
              <p className="text-sm text-mail-600">
                Enable keyboard shortcuts for common actions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Smart compose</h3>
              <p className="text-sm text-mail-600">
                Show predictive writing suggestions as you type
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Conversation view</h3>
              <p className="text-sm text-mail-600">
                Group emails with the same subject together
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Data & Privacy</h2>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Export all mail data
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            Clear browser data
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}
