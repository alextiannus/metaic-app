import { useState } from 'react';
import { History, Search, Filter, Calendar, MessageSquare, Phone, Video, Mail, User, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HistoryEntry {
  id: string;
  date: string;
  time: string;
  type: 'message' | 'call' | 'video' | 'email' | 'meeting' | 'card-share';
  contact: {
    name: string;
    avatar: string;
    company: string;
  };
  title: string;
  description: string;
  location?: string;
  duration?: string;
  tags?: string[];
}

export function CommunicationHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'message' | 'call' | 'video' | 'email' | 'meeting' | 'card-share'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();

  const historyEntries: HistoryEntry[] = [
    {
      id: '1',
      date: '2024-12-04',
      time: '10:30 AM',
      type: 'video',
      contact: {
        name: 'Sarah Chen',
        avatar: '👩‍💼',
        company: 'Tech Innovations',
      },
      title: 'Video Call - AI Partnership Discussion',
      description: 'Discussed AI integration opportunities for Q1 2025. Sarah interested in collaboration.',
      duration: '45 min',
      tags: ['AI', 'Partnership', 'Q1 2025'],
    },
    {
      id: '2',
      date: '2024-12-04',
      time: '09:15 AM',
      type: 'message',
      contact: {
        name: 'Michael Rodriguez',
        avatar: '👨‍💻',
        company: 'StartupHub',
      },
      title: 'Follow-up Message',
      description: 'Sent follow-up on investment discussion. Shared pitch deck and financial projections.',
      tags: ['Investment', 'Follow-up'],
    },
    {
      id: '3',
      date: '2024-12-03',
      time: '03:45 PM',
      type: 'meeting',
      contact: {
        name: 'Emily Watson',
        avatar: '👩‍🔬',
        company: 'BioTech Labs',
      },
      title: 'Coffee Meeting - Networking',
      description: 'Casual networking coffee. Discussed industry trends and potential collaborations.',
      location: 'Blue Bottle Coffee, Downtown',
      duration: '1 hr',
      tags: ['Networking', 'BioTech'],
    },
    {
      id: '4',
      date: '2024-12-03',
      time: '11:00 AM',
      type: 'email',
      contact: {
        name: 'David Kim',
        avatar: '👨‍💼',
        company: 'Global Ventures',
      },
      title: 'Email - Introduction Request',
      description: 'Requested introduction to VP of Product. David agreed to connect us.',
      tags: ['Introduction', 'Product'],
    },
    {
      id: '5',
      date: '2024-12-02',
      time: '06:30 PM',
      type: 'card-share',
      contact: {
        name: 'Lisa Park',
        avatar: '👩‍💼',
        company: 'Design Studio Co',
      },
      title: 'Business Card Exchange',
      description: 'Met at Tech Conference 2024. Exchanged digital business cards via MetaIC.',
      location: 'Convention Center',
      tags: ['Conference', 'New Contact'],
    },
    {
      id: '6',
      date: '2024-12-02',
      time: '02:15 PM',
      type: 'call',
      contact: {
        name: 'James Wilson',
        avatar: '👨‍💻',
        company: 'Cloud Systems Inc',
      },
      title: 'Phone Call - Technical Discussion',
      description: 'Discussed cloud infrastructure requirements and pricing models.',
      duration: '25 min',
      tags: ['Technical', 'Cloud'],
    },
    {
      id: '7',
      date: '2024-12-01',
      time: '04:00 PM',
      type: 'message',
      contact: {
        name: 'Rachel Green',
        avatar: '👩‍💼',
        company: 'Marketing Pro',
      },
      title: 'LinkedIn Message',
      description: 'Congratulated on recent promotion. Discussed potential marketing collaboration.',
      tags: ['Marketing', 'Congratulations'],
    },
    {
      id: '8',
      date: '2024-12-01',
      time: '10:00 AM',
      type: 'meeting',
      contact: {
        name: 'Tom Anderson',
        avatar: '👨‍💼',
        company: 'Finance Corp',
      },
      title: 'Business Lunch Meeting',
      description: 'Quarterly review and planning for next quarter. Agreed on 3 new initiatives.',
      location: 'The Grill Restaurant',
      duration: '2 hr',
      tags: ['Quarterly Review', 'Planning'],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'call':
        return Phone;
      case 'video':
        return Video;
      case 'email':
        return Mail;
      case 'meeting':
        return Calendar;
      case 'card-share':
        return User;
      default:
        return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message':
        return '#38BDF8';
      case 'call':
        return '#10B981';
      case 'video':
        return '#8B5CF6';
      case 'email':
        return '#F59E0B';
      case 'meeting':
        return '#EF4444';
      case 'card-share':
        return '#FACC15';
      default:
        return '#38BDF8';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'card-share':
        return 'Card Exchange';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const filteredEntries = historyEntries.filter((entry) => {
    const matchesSearch =
      searchQuery === '' ||
      entry.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.contact.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === 'all' || entry.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const groupByDate = (entries: HistoryEntry[]) => {
    const groups: { [key: string]: HistoryEntry[] } = {};
    entries.forEach((entry) => {
      const date = entry.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(entry);
    });
    return groups;
  };

  const groupedEntries = groupByDate(filteredEntries);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-6 h-6 text-[#FACC15]" strokeWidth={1.5} />
            <h1 className="text-white text-2xl">Communication History</h1>
          </div>
          <p className="text-white/60 text-sm">All your networking activities tracked by MetaIC</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search contacts, companies, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FACC15]/50"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-white/60" strokeWidth={1.5} />
            <span className="text-white/60 text-sm">Filter by type</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {(['all', 'message', 'call', 'video', 'email', 'meeting', 'card-share'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                  filterType === type
                    ? 'bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617]'
                    : 'bg-[#0F172A]/80 border border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All' : getTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-white/60 text-sm">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
        </div>

        {/* History List - Grouped by Date */}
        <div className="space-y-6">
          {Object.keys(groupedEntries)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((dateKey) => (
              <div key={dateKey}>
                {/* Date Header */}
                <div className="flex items-center gap-2 mb-3 sticky top-0 bg-[#020617] py-2 z-10">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span className="text-white/60 text-sm px-3">{formatDate(dateKey)}</span>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                {/* Entries for this date */}
                <div className="space-y-3">
                  {groupedEntries[dateKey].map((entry) => {
                    const Icon = getTypeIcon(entry.type);
                    const color = getTypeColor(entry.type);

                    return (
                      <div
                        key={entry.id}
                        className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-xl hover:bg-white/5 transition-all cursor-pointer"
                      >
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="text-3xl">{entry.contact.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h4 className="text-white mb-0.5">{entry.contact.name}</h4>
                                <p className="text-white/60 text-xs">{entry.contact.company}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: `${color}20` }}
                                >
                                  <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.5} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-white text-sm mb-2">{entry.title}</h4>

                        {/* Description */}
                        <p className="text-white/60 text-sm mb-3">{entry.description}</p>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" strokeWidth={1.5} />
                            <span>{entry.time}</span>
                          </div>
                          {entry.duration && (
                            <div className="flex items-center gap-1">
                              <span>•</span>
                              <span>{entry.duration}</span>
                            </div>
                          )}
                          {entry.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" strokeWidth={1.5} />
                              <span>{entry.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {entry.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-lg bg-white/5 text-white/60 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <div className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-12 text-center">
            <History className="w-12 h-12 text-white/20 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-white/60 mb-2">No communication history found</p>
            <p className="text-white/40 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}