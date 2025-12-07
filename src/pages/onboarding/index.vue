<template>
  <view class="onboarding-flow">
    <!-- Card Photo Capture -->
    <CardPhotoCapture
      v-if="currentStep === 'capture'"
      @photo-capture="handlePhotoCapture"
      @skip="handleSkipCapture"
    />

    <!-- Manual Card Input -->
    <ManualCardInput
      v-if="currentStep === 'input'"
      :initial-data="cardData"
      @complete="handleManualInputComplete"
      @back="capturedImage ? handleBackToCapture : undefined"
    />

    <!-- Card Customization -->
    <CardCustomization
      v-if="currentStep === 'customize'"
      @complete="handleCustomizationComplete"
      @back="handleBackToInput"
    />

    <!-- Welcome Success -->
    <WelcomeSuccess
      v-if="currentStep === 'welcome'"
      :user-name="cardData?.fullName || 'there'"
      @continue="handleWelcomeContinue"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardPhotoCapture from './CardPhotoCapture.vue'
import ManualCardInput from './ManualCardInput.vue'
import CardCustomization from './CardCustomization.vue'
import WelcomeSuccess from './WelcomeSuccess.vue'

type OnboardingStep = 'capture' | 'input' | 'customize' | 'welcome'

const emit = defineEmits<{
  complete: [userData: any]
}>()

const currentStep = ref<OnboardingStep>('capture')
const cardData = ref<any>(null)
const capturedImage = ref<string | null>(null)
const finalData = ref<any>(null)

const handlePhotoCapture = (imageData: string) => {
  capturedImage.value = imageData
  // Simulate AI extraction
  const extractedData = {
    fullName: 'Alex Tian Ye',
    title: 'Founder & CEO',
    company: 'Immedi.AI',
    email: 'alex@immedi.ai',
    phone: '+65 9876 5432',
    website: 'https://immedi.ai',
  }
  cardData.value = extractedData
  currentStep.value = 'input'
}

const handleSkipCapture = () => {
  currentStep.value = 'input'
}

const handleManualInputComplete = (data: any) => {
  cardData.value = data
  currentStep.value = 'customize'
}

const handleCustomizationComplete = (customization: any) => {
  const userData = {
    ...cardData.value,
    customization,
    capturedImage: capturedImage.value,
  }
  finalData.value = userData
  currentStep.value = 'welcome'
}

const handleWelcomeContinue = () => {
  emit('complete', finalData.value)
}

const handleBackToInput = () => {
  currentStep.value = 'input'
}

const handleBackToCapture = () => {
  currentStep.value = 'capture'
}
</script>

<style lang="scss" scoped>
.onboarding-flow {
  min-height: 100vh;
  background: #020617;
}
</style>

