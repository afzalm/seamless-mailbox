
import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Filter {
  id: string;
  name: string;
  conditions: string;
  actions: string;
  active: boolean;
}

export function SettingsFilters() {
  const [filters, setFilters] = useState<Filter[]>([
    {
      id: '1',
      name: 'Marketing Emails',
      conditions: 'From contains "newsletter", "marketing", or "promo"',
      actions: 'Skip Inbox, Apply label "Marketing"',
      active: true
    },
    {
      id: '2',
      name: 'Important Clients',
      conditions: 'From contains "clientA@example.com" or "clientB@example.com"',
      actions: 'Star, Apply label "VIP Clients"',
      active: true
    },
    {
      id: '3',
      name: 'Social Media',
      conditions: 'From contains "facebook.com", "twitter.com", or "instagram.com"',
      actions: 'Skip Inbox, Apply label "Social"',
      active: false
    }
  ]);
  
  const [blockedAddresses, setBlockedAddresses] = useState<string[]>([
    'spam@example.com',
    'unwanted@example.com'
  ]);
  
  const toggleFilter = (id: string) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, active: !filter.active } : filter
    ));
  };
  
  const removeBlockedAddress = (address: string) => {
    setBlockedAddresses(blockedAddresses.filter(a => a !== address));
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <p className="text-sm text-mail-600">
          Create rules to filter your incoming mail and perform actions automatically.
        </p>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">My filters</h3>
            <Button size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Create new filter
            </Button>
          </div>
          
          <div className="space-y-3">
            {filters.map((filter) => (
              <div key={filter.id} className="p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{filter.name}</h4>
                      {!filter.active && (
                        <span className="text-xs bg-mail-200 text-mail-600 px-2 py-0.5 rounded">
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-mail-600 mt-2">
                      <span className="font-medium">Conditions:</span> {filter.conditions}
                    </p>
                    <p className="text-sm text-mail-600 mt-1">
                      <span className="font-medium">Actions:</span> {filter.actions}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={filter.active} 
                      onCheckedChange={() => toggleFilter(filter.id)} 
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-mail-600 hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Blocked Addresses</h2>
        <p className="text-sm text-mail-600">
          Emails from these addresses will be automatically sent to spam.
        </p>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Blocked email addresses</h3>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Block address
            </Button>
          </div>
          
          <div className="border rounded-md divide-y">
            {blockedAddresses.length > 0 ? (
              blockedAddresses.map((address) => (
                <div key={address} className="p-3 flex items-center justify-between">
                  <span>{address}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-mail-600 hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeBlockedAddress(address)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-mail-600">
                No blocked addresses yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
