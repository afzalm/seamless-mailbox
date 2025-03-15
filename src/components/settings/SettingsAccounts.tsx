
import { User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SettingsAccounts() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Email Accounts</h2>
        <p className="text-sm text-mail-600">
          Manage your connected email accounts and import settings.
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="p-4 border rounded-md">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">johndoe@example.com</h3>
                <p className="text-sm text-mail-600">Primary Account</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Manage
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center p-6 border rounded-md border-dashed">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add another account
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Import Options</h2>
        <p className="text-sm text-mail-600">
          Import mail, contacts, and settings from other mail providers.
        </p>
        
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Button variant="outline" className="justify-start h-auto py-4 px-6">
            <div className="text-left">
              <h3 className="font-medium">Import Contacts</h3>
              <p className="text-xs text-mail-600 mt-1">
                Import contacts from other providers
              </p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-6">
            <div className="text-left">
              <h3 className="font-medium">Import Mail</h3>
              <p className="text-xs text-mail-600 mt-1">
                Transfer emails from other accounts
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
