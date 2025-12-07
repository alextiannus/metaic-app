import { useState } from 'react';
import { CardPhotoCapture } from './CardPhotoCapture';
import { ManualCardInput } from './ManualCardInput';
import { CardCustomization } from './CardCustomization';
import { WelcomeSuccess } from './WelcomeSuccess';

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
}

type OnboardingStep = 'capture' | 'input' | 'customize' | 'welcome';

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('capture');
  const [cardData, setCardData] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [finalData, setFinalData] = useState<any>(null);

  const handlePhotoCapture = (imageData: string) => {
    setCapturedImage(imageData);
    // Simulate AI extraction
    const extractedData = {
      fullName: 'Alex Tian Ye',
      title: 'Founder & CEO',
      company: 'Immedi.AI',
      email: 'alex@immedi.ai',
      phone: '+65 9876 5432',
      website: 'https://immedi.ai',
    };
    setCardData(extractedData);
    setCurrentStep('input');
  };

  const handleSkipCapture = () => {
    setCurrentStep('input');
  };

  const handleManualInputComplete = (data: any) => {
    setCardData(data);
    setCurrentStep('customize');
  };

  const handleCustomizationComplete = (customization: any) => {
    const userData = {
      ...cardData,
      customization,
      capturedImage,
    };
    setFinalData(userData);
    setCurrentStep('welcome');
  };

  const handleWelcomeContinue = () => {
    onComplete(finalData);
  };

  const handleBackToInput = () => {
    setCurrentStep('input');
  };

  const handleBackToCapture = () => {
    setCurrentStep('capture');
  };

  return (
    <>
      {currentStep === 'capture' && (
        <CardPhotoCapture
          onPhotoCapture={handlePhotoCapture}
          onSkip={handleSkipCapture}
        />
      )}
      {currentStep === 'input' && (
        <ManualCardInput
          onComplete={handleManualInputComplete}
          onBack={capturedImage ? handleBackToCapture : undefined}
          initialData={cardData}
        />
      )}
      {currentStep === 'customize' && (
        <CardCustomization
          onComplete={handleCustomizationComplete}
          onBack={handleBackToInput}
        />
      )}
      {currentStep === 'welcome' && (
        <WelcomeSuccess
          userName={cardData?.fullName || 'there'}
          onContinue={handleWelcomeContinue}
        />
      )}
    </>
  );
}