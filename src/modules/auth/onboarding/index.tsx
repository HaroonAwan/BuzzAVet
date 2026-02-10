'use client';

import { useOnboarding } from './hooks/useOnboarding';
import OnboardingLayout from './layouts/OnboardingLayout';
import Step1Privacy from './sections/Step1Privacy';
import Step2ServiceSelection from './sections/Step2ServiceSelection';
import Step3PetInformation from './sections/Step3PetInformation';
import Step4HealthSnapshot from './sections/Step4HealthSnapshot';

export default function OnboardingPage() {
  const {
    currentStep,
    totalSteps,
    handleNext,
    handleBack,
    handleSaveAndExit,
    canGoBack,
    nextButtonText,
    isSubmitting,
  } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Privacy />;
      case 2:
        return <Step2ServiceSelection />;
      case 3:
        return <Step3PetInformation />;
      case 4:
        return <Step4HealthSnapshot />;
      default:
        return <Step1Privacy />;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={canGoBack ? handleBack : undefined}
      onNext={handleNext}
      onSaveAndExit={handleSaveAndExit}
      canGoBack={canGoBack}
      canGoNext={true}
      nextButtonText={nextButtonText}
      isSubmitting={isSubmitting}
      showSaveAndExit={currentStep !== 4}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}
