import { useState } from 'react';
import { Calendar, Sparkles, MessageSquare, Edit2, Check, X, Clock, Send, RotateCcw, History } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  company: string;
  lastContact: string;
  nextFollowUp: string;
  priority: 'high' | 'medium' | 'low';
  context: string;
}

interface GreetingModal {
  isOpen: boolean;
  contact: Contact | null;
  message: string;
}

interface CommunicationPlanPageProps {
  onNavigateToHistory?: () => void;
}

export function CommunicationPlanPage({ onNavigateToHistory }: CommunicationPlanPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      company: 'Tech Innovations',
      lastContact: '2024-11-20',
      nextFollowUp: '2024-12-08',
      priority: 'high',
      context: 'Follow up on AI partnership discussion',
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      avatar: '👨‍💻',
      company: 'StartupHub',
      lastContact: '2024-11-15',
      nextFollowUp: '2024-12-10',
      priority: 'medium',
      context: 'Check in on investment progress',
    },
    {
      id: '3',
      name: 'Emily Watson',
      avatar: '👩‍🔬',
      company: 'BioTech Labs',
      lastContact: '2024-11-25',
      nextFollowUp: '2024-12-15',
      priority: 'low',
      context: 'Quarterly networking catch-up',
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editContext, setEditContext] = useState('');

  const [greetingModal, setGreetingModal] = useState<GreetingModal>({
    isOpen: false,
    contact: null,
    message: '',
  });

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      // Update contacts with new AI-generated schedules
      setContacts((prev) =>
        prev.map((contact) => ({
          ...contact,
          nextFollowUp: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        }))
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleGenerateGreeting = (contact: Contact) => {
    setGreetingModal({ isOpen: true, contact, message: '' });
    
    // Simulate AI greeting generation
    setTimeout(() => {
      const greetingMessages = [
        `Hi ${contact.name.split(' ')[0]}! 👋\n\nI hope this message finds you well. I wanted to follow up on our recent discussion about ${contact.context.toLowerCase()}.\n\nWould you be available for a quick call this week to discuss next steps?\n\nBest regards,\nAlex`,
        `Hello ${contact.name.split(' ')[0]},\n\nIt's been great connecting with you at ${contact.company}. I've been thinking about ${contact.context.toLowerCase()} and would love to continue our conversation.\n\nLet me know when you're free!\n\nCheers,\nAlex`,
        `Hey ${contact.name.split(' ')[0]}! 😊\n\nJust wanted to touch base and see how things are progressing with ${contact.context.toLowerCase()}. \n\nLooking forward to hearing from you!\n\nWarm regards,\nAlex`,
      ];
      
      const randomMessage = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
      setGreetingModal((prev) => ({ ...prev, message: randomMessage }));
    }, 1500);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingId(contact.id);
    setEditDate(contact.nextFollowUp);
    setEditContext(contact.context);
  };

  const handleSaveEdit = (id: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, nextFollowUp: editDate, context: editContext }
          : contact
      )
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditDate('');
    setEditContext('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#FACC15';
      case 'low':
        return '#38BDF8';
      default:
        return '#38BDF8';
    }
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const followUp = new Date(date);
    const diffTime = followUp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#FACC15]" strokeWidth={1.5} />
              <h1 className="text-white text-2xl">Communication Plan</h1>
            </div>
            <button
              onClick={onNavigateToHistory}
              className="w-10 h-10 rounded-full bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center hover:bg-white/5 transition-all"
            >
              <History className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-white/60 text-sm">AI-powered follow-up scheduling</p>
        </div>

        {/* Generate Plan Button */}
        <button
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="w-full mb-6 py-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-[#020617]/30 border-t-[#020617] rounded-full animate-spin"></div>
              <span className="font-medium">Generating Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-medium">Generate AI Plan</span>
            </>
          )}
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 text-center">
            <div className="text-[#FACC15] text-2xl mb-1">{contacts.length}</div>
            <div className="text-white/60 text-xs">Contacts</div>
          </div>
          <div className="rounded-xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 text-center">
            <div className="text-[#38BDF8] text-2xl mb-1">
              {contacts.filter((c) => getDaysUntil(c.nextFollowUp) <= 7).length}
            </div>
            <div className="text-white/60 text-xs">This Week</div>
          </div>
          <div className="rounded-xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 text-center">
            <div className="text-[#EF4444] text-2xl mb-1">
              {contacts.filter((c) => c.priority === 'high').length}
            </div>
            <div className="text-white/60 text-xs">High Priority</div>
          </div>
        </div>

        {/* Contact List */}
        <div className="space-y-4">
          <h3 className="text-white text-sm mb-3">Upcoming Follow-ups</h3>
          {contacts
            .sort((a, b) => new Date(a.nextFollowUp).getTime() - new Date(b.nextFollowUp).getTime())
            .map((contact) => {
              const isEditing = editingId === contact.id;
              const daysUntil = getDaysUntil(contact.nextFollowUp);

              return (
                <div
                  key={contact.id}
                  className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-xl"
                >
                  {/* Contact Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl">{contact.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="text-white">{contact.name}</h4>
                          <p className="text-white/60 text-sm">{contact.company}</p>
                        </div>
                        <div
                          className="px-2 py-1 rounded-lg text-xs"
                          style={{
                            backgroundColor: `${getPriorityColor(contact.priority)}20`,
                            color: getPriorityColor(contact.priority),
                          }}
                        >
                          {contact.priority}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Follow-up Date */}
                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-2 mb-3 p-3 rounded-xl bg-white/5">
                        <Clock className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />
                        <span className="text-white text-sm">
                          {new Date(contact.nextFollowUp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="text-white/40 text-xs ml-auto">
                          {daysUntil === 0
                            ? 'Today'
                            : daysUntil === 1
                            ? 'Tomorrow'
                            : daysUntil > 0
                            ? `in ${daysUntil} days`
                            : `${Math.abs(daysUntil)} days ago`}
                        </span>
                      </div>

                      <p className="text-white/60 text-sm mb-4">{contact.context}</p>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleGenerateGreeting(contact)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm font-medium">Generate Greeting</span>
                        </button>
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Edit Mode */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <label className="block text-white/60 text-xs mb-2">Follow-up Date</label>
                          <input
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FACC15]/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-xs mb-2">Context</label>
                          <textarea
                            value={editContext}
                            onChange={(e) => setEditContext(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FACC15]/50 resize-none"
                          />
                        </div>
                      </div>

                      {/* Save/Cancel Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(contact.id)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#10B981] text-white hover:bg-[#10B981]/90 transition-all flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm">Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm">Cancel</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Greeting Modal */}
      {greetingModal.isOpen && (
        <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F172A] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                  <h3 className="text-white">AI Greeting</h3>
                </div>
                <button
                  onClick={() => setGreetingModal({ isOpen: false, contact: null, message: '' })}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <p className="text-white/60 text-sm">
                To: {greetingModal.contact?.name}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!greetingModal.message ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-[#FACC15]/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#FACC15] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="flex items-center gap-2 text-[#FACC15]">
                    <Sparkles className="w-5 h-5 animate-pulse" strokeWidth={1.5} />
                    <span className="text-sm">AI is writing your message...</span>
                  </div>
                </div>
              ) : (
                <>
                  <textarea
                    value={greetingModal.message}
                    onChange={(e) =>
                      setGreetingModal((prev) => ({ ...prev, message: e.target.value }))
                    }
                    rows={10}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FACC15]/50 resize-none mb-4"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleGenerateGreeting(greetingModal.contact!)}
                      className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-sm">Regenerate</span>
                    </button>
                    <button
                      onClick={() => {
                        console.log('Sending message:', greetingModal.message);
                        setGreetingModal({ isOpen: false, contact: null, message: '' });
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-sm font-medium">Send Message</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}