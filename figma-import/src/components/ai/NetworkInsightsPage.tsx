import { useState } from 'react';
import { TrendingUp, Users, Calendar, Zap, Award, Target, ArrowUp, ArrowDown, Sparkles, TrendingDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface InsightCard {
  icon: any;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  color: string;
}

interface TopContact {
  name: string;
  avatar: string;
  interactions: number;
  lastContact: string;
  trend: 'up' | 'down' | 'stable';
}

interface Activity {
  date: string;
  type: 'connection' | 'meeting' | 'message' | 'event';
  description: string;
  count: number;
}

export function NetworkInsightsPage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const stats: InsightCard[] = [
    {
      icon: Users,
      title: 'Total Connections',
      value: '247',
      change: 12.5,
      changeLabel: '+31 this month',
      color: '#FACC15',
    },
    {
      icon: Zap,
      title: 'Engagement Rate',
      value: '68%',
      change: 5.2,
      changeLabel: '+3.5% vs last month',
      color: '#38BDF8',
    },
    {
      icon: Calendar,
      title: 'Active Days',
      value: '22/30',
      change: -2.1,
      changeLabel: '2 days less',
      color: '#EF4444',
    },
    {
      icon: Award,
      title: 'Network Score',
      value: '8.7',
      change: 8.7,
      changeLabel: 'Excellent',
      color: '#10B981',
    },
  ];

  const topContacts: TopContact[] = [
    {
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      interactions: 47,
      lastContact: '2 days ago',
      trend: 'up',
    },
    {
      name: 'Michael Rodriguez',
      avatar: '👨‍💻',
      interactions: 38,
      lastContact: '5 days ago',
      trend: 'up',
    },
    {
      name: 'Emily Watson',
      avatar: '👩‍🔬',
      interactions: 29,
      lastContact: '1 week ago',
      trend: 'stable',
    },
    {
      name: 'David Kim',
      avatar: '👨‍💼',
      interactions: 24,
      lastContact: '3 days ago',
      trend: 'down',
    },
  ];

  const weeklyData = [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 19 },
    { day: 'Wed', value: 15 },
    { day: 'Thu', value: 25 },
    { day: 'Fri', value: 22 },
    { day: 'Sat', value: 8 },
    { day: 'Sun', value: 5 },
  ];

  const activities: Activity[] = [
    {
      date: 'Today',
      type: 'connection',
      description: 'Connected with 3 new people',
      count: 3,
    },
    {
      date: 'Yesterday',
      type: 'meeting',
      description: 'Attended 2 networking events',
      count: 2,
    },
    {
      date: '2 days ago',
      type: 'message',
      description: 'Sent 15 follow-up messages',
      count: 15,
    },
    {
      date: '3 days ago',
      type: 'event',
      description: 'Shared business card 8 times',
      count: 8,
    },
  ];

  const aiRecommendations = [
    {
      title: 'Reconnect with dormant contacts',
      description: 'You have 12 contacts you haven\'t spoken to in over 3 months',
      action: 'View List',
      priority: 'medium',
    },
    {
      title: 'Optimize your networking schedule',
      description: 'Your engagement is 40% higher on Thursdays. Schedule more meetings then.',
      action: 'Apply',
      priority: 'high',
    },
    {
      title: 'Expand industry connections',
      description: 'Only 15% of your network is in the tech industry. Consider joining tech events.',
      action: 'Find Events',
      priority: 'low',
    },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return '👥';
      case 'meeting':
        return '📅';
      case 'message':
        return '💬';
      case 'event':
        return '🎯';
      default:
        return '📊';
    }
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

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#FACC15]" strokeWidth={1.5} />
              <h1 className="text-white text-2xl">Network Insights</h1>
            </div>
          </div>
          <p className="text-white/60 text-sm">Your networking analytics and growth</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10">
          {(['week', 'month', 'year'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change > 0;
            const isNegative = stat.change < 0;

            return (
              <div
                key={index}
                className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 shadow-xl"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} strokeWidth={1.5} />
                </div>
                <div className="text-white text-2xl mb-1">{stat.value}</div>
                <div className="text-white/60 text-xs mb-2">{stat.title}</div>
                <div className="flex items-center gap-1">
                  {isPositive && <ArrowUp className="w-3 h-3 text-[#10B981]" strokeWidth={2} />}
                  {isNegative && <ArrowDown className="w-3 h-3 text-[#EF4444]" strokeWidth={2} />}
                  <span
                    className={`text-xs ${
                      isPositive
                        ? 'text-[#10B981]'
                        : isNegative
                        ? 'text-[#EF4444]'
                        : 'text-white/60'
                    }`}
                  >
                    {stat.changeLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Activity Chart */}
        <div className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Weekly Activity</h3>
            <div className="flex items-center gap-1 text-[#10B981] text-sm">
              <ArrowUp className="w-4 h-4" strokeWidth={2} />
              <span>+18%</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-32 mb-2">
            {weeklyData.map((day, index) => {
              const height = (day.value / maxValue) * 100;
              const isToday = index === 3; // Thursday

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center h-full">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isToday
                          ? 'bg-gradient-to-t from-[#FACC15] to-[#38BDF8]'
                          : 'bg-white/10'
                      }`}
                      style={{ height: `${height}%` }}
                    >
                      {isToday && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap">
                          {day.value}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-white/60 text-xs">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Connections */}
        <div className="mb-6">
          <h3 className="text-white text-sm mb-3">Top Connections</h3>
          <div className="space-y-3">
            {topContacts.map((contact, index) => (
              <div
                key={index}
                className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{contact.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{contact.name}</h4>
                    <p className="text-white/60 text-xs">
                      {contact.interactions} interactions • {contact.lastContact}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        contact.trend === 'up'
                          ? 'bg-[#10B981]/20'
                          : contact.trend === 'down'
                          ? 'bg-[#EF4444]/20'
                          : 'bg-white/10'
                      }`}
                    >
                      {contact.trend === 'up' && (
                        <ArrowUp className="w-4 h-4 text-[#10B981]" strokeWidth={2} />
                      )}
                      {contact.trend === 'down' && (
                        <ArrowDown className="w-4 h-4 text-[#EF4444]" strokeWidth={2} />
                      )}
                      {contact.trend === 'stable' && (
                        <div className="w-2 h-0.5 bg-white/60"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-white text-sm mb-3">Recent Activity</h3>
          <div className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-xl space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-white text-sm mb-1">{activity.description}</p>
                  <p className="text-white/40 text-xs">{activity.date}</p>
                </div>
                <div className="px-2 py-1 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] text-xs">
                  {activity.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#FACC15]" strokeWidth={1.5} />
            <h3 className="text-white text-sm">AI Recommendations</h3>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className="rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white flex-1">{rec.title}</h4>
                  <div
                    className="px-2 py-1 rounded-lg text-xs"
                    style={{
                      backgroundColor: `${getPriorityColor(rec.priority)}20`,
                      color: getPriorityColor(rec.priority),
                    }}
                  >
                    {rec.priority}
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4">{rec.description}</p>
                <button className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] text-sm hover:opacity-90 transition-all">
                  {rec.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Network Health Score */}
        <div className="rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20 backdrop-blur-xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
              <Target className="w-6 h-6 text-[#020617]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-white">Network Health</h3>
              <p className="text-white/60 text-xs">Overall performance score</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">Current Score</span>
              <span className="text-[#10B981]">87/100</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8]"
                style={{ width: '87%' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-[#FACC15] text-xl mb-1">92%</div>
              <div className="text-white/60 text-xs">Response Rate</div>
            </div>
            <div>
              <div className="text-[#38BDF8] text-xl mb-1">78%</div>
              <div className="text-white/60 text-xs">Follow-up Rate</div>
            </div>
            <div>
              <div className="text-[#10B981] text-xl mb-1">85%</div>
              <div className="text-white/60 text-xs">Engagement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}