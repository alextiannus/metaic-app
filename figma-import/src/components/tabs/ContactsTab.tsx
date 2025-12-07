import { useState } from 'react';
import { Users, Search, UserPlus, ChevronRight, Plus, X, ScanLine, Radar } from 'lucide-react';
import { sampleContacts } from '../../data/sampleContacts';
import { ContactCardView } from './ContactCardView';
import { useLanguage } from '../../contexts/LanguageContext';
import { AddContactPage } from '../AddContactPage';
import { FaceToFaceExchangePage } from '../FaceToFaceExchangePage';
import { ContactRadarPage } from '../ContactRadarPage';

type ContactView = 'list' | 'card' | 'addContact' | 'faceToFace' | 'radar';

export function ContactsTab() {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [currentView, setCurrentView] = useState<ContactView>('list');
  const { language } = useLanguage();

  // Filter contacts based on search
  const filteredContacts = sampleContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle navigation to sub-pages
  if (currentView === 'addContact') {
    return <AddContactPage onBack={() => setCurrentView('list')} />;
  }

  if (currentView === 'faceToFace') {
    return <FaceToFaceExchangePage onBack={() => setCurrentView('list')} />;
  }

  if (currentView === 'radar') {
    return <ContactRadarPage onBack={() => setCurrentView('list')} />;
  }

  // If a contact is selected, show the contact card view
  if (selectedContactId !== null) {
    return (
      <ContactCardView
        contactId={selectedContactId}
        onBack={() => setSelectedContactId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header with Add Button */}
        <div className="mb-6 relative">
          <h1 className="text-white text-2xl mb-2">
            {language === 'zh' ? '联系人' : 'Contacts'}
          </h1>
          <p className="text-white/60 text-sm">
            {language === 'zh' ? '管理你的人脉网络' : 'Manage your network connections'}
          </p>

          {/* Add Button in Upper Right */}
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="absolute top-0 right-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          >
            {showAddMenu ? (
              <X className="w-6 h-6 text-[#020617]" strokeWidth={2} />
            ) : (
              <Plus className="w-6 h-6 text-[#020617]" strokeWidth={2} />
            )}
          </button>

          {/* Add Contact Dropdown Menu */}
          {showAddMenu && (
            <div className="absolute top-14 right-0 w-64 bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50">
              <button
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-3 mb-2 transition-all text-left"
                onClick={() => {
                  setShowAddMenu(false);
                  setCurrentView('addContact');
                }}
              >
                <UserPlus className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                <span className="text-sm">
                  {language === 'zh' ? '添加联系人' : 'Add Contact'}
                </span>
              </button>
              
              <button
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-3 mb-2 transition-all text-left"
                onClick={() => {
                  setShowAddMenu(false);
                  setCurrentView('faceToFace');
                }}
              >
                <ScanLine className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                <span className="text-sm">
                  {language === 'zh' ? '面对面交换' : 'Face to Face Exchange'}
                </span>
              </button>
              
              <button
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-3 transition-all text-left"
                onClick={() => {
                  setShowAddMenu(false);
                  setCurrentView('radar');
                }}
              >
                <Radar className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                <span className="text-sm">
                  {language === 'zh' ? '联系人雷达' : 'Contact Radar'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" strokeWidth={1.5} />
            <input
              type="text"
              placeholder={language === 'zh' ? '搜索联系人...' : 'Search contacts...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FACC15]/50"
            />
          </div>
        </div>

        {/* Contacts List */}
        {filteredContacts.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white/60 text-xs uppercase tracking-wider">
                {filteredContacts.length} Contact{filteredContacts.length !== 1 ? 's' : ''}
              </h3>
            </div>
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className="w-full rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 shadow-xl hover:bg-white/5 hover:border-[#FACC15]/30 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-2xl">
                      {contact.avatar}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-white text-sm font-medium">{contact.name}</h3>
                      {contact.chineseName && (
                        <span className="text-white/40 text-xs">{contact.chineseName}</span>
                      )}
                    </div>
                    <p className="text-[#38BDF8] text-xs mb-1">{contact.title}</p>
                    <p className="text-white/60 text-xs">{contact.company}</p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-white/40 flex-shrink-0" strokeWidth={1.5} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-12 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#38BDF8]/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#38BDF8]" strokeWidth={1.5} />
            </div>
            <h3 className="text-white mb-2">No Contacts Found</h3>
            <p className="text-white/60 text-sm">
              {searchQuery ? 'Try a different search term.' : 'Start building your network by scanning business cards or adding contacts manually.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}