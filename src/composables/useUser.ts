import { ref } from 'vue'

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise'

const hasCreatedCard = ref(false)
const userTokens = ref(150)
const subscriptionPlan = ref<SubscriptionPlan>('free')

export function useUser() {
  const setHasCreatedCard = (value: boolean) => {
    hasCreatedCard.value = value
  }

  const setUserTokens = (value: number) => {
    userTokens.value = value
  }

  const setSubscriptionPlan = (value: SubscriptionPlan) => {
    subscriptionPlan.value = value
  }

  return {
    hasCreatedCard,
    setHasCreatedCard,
    userTokens,
    setUserTokens,
    subscriptionPlan,
    setSubscriptionPlan,
  }
}

