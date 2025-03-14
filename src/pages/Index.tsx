
import { useState } from 'react';
import { MailSidebar } from '@/components/MailSidebar';
import { MailHeader } from '@/components/MailHeader';
import { MailList, type Mail } from '@/components/MailList';
import { MailDetail } from '@/components/MailDetail';

const Index = () => {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="flex flex-col flex-1 overflow-hidden rounded-xl shadow-xl">
        <MailHeader />
        <div className="flex flex-1 overflow-hidden">
          <MailSidebar />
          {selectedMail ? (
            <MailDetail 
              mail={selectedMail} 
              onBack={() => setSelectedMail(null)} 
            />
          ) : (
            <MailList onSelectMail={setSelectedMail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
