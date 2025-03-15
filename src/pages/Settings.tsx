
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SettingsGeneral } from '@/components/settings/SettingsGeneral';
import { SettingsAccounts } from '@/components/settings/SettingsAccounts';
import { SettingsFilters } from '@/components/settings/SettingsFilters';
import { SettingsAdvanced } from '@/components/settings/SettingsAdvanced';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col h-screen p-6" style={{ background: 'var(--gradient-bg)' }}>
      <div className="flex flex-col flex-1 overflow-hidden rounded-xl shadow-xl glass-panel">
        <div className="flex items-center justify-between p-4 border-b border-mail-200">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto bg-transparent p-0 space-x-2">
              <TabsTrigger 
                value="general" 
                className="rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="accounts" 
                className="rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Accounts and Import
              </TabsTrigger>
              <TabsTrigger 
                value="filters" 
                className="rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Filters and blocked addresses
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                className="rounded-md data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-0">
              <SettingsGeneral />
            </TabsContent>
            
            <TabsContent value="accounts" className="mt-0">
              <SettingsAccounts />
            </TabsContent>
            
            <TabsContent value="filters" className="mt-0">
              <SettingsFilters />
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-0">
              <SettingsAdvanced />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
