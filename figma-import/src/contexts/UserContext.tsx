import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  hasCreatedCard: boolean;
  setHasCreatedCard: (value: boolean) => void;
  userTokens: number;
  setUserTokens: (value: number) => void;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  setSubscriptionPlan: (value: 'free' | 'pro' | 'enterprise') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [hasCreatedCard, setHasCreatedCard] = useState(false); // Set to false for new users, true for demo
  const [userTokens, setUserTokens] = useState(150); // Free tier: 200 tokens
  const [subscriptionPlan, setSubscriptionPlan] = useState<'free' | 'pro' | 'enterprise'>('free');

  return (
    <UserContext.Provider
      value={{
        hasCreatedCard,
        setHasCreatedCard,
        userTokens,
        setUserTokens,
        subscriptionPlan,
        setSubscriptionPlan,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}