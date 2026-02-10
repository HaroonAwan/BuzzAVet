'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import type { OnboardingFormData } from '@/types/onboarding';
import {
  useInitiateProfileMutation,
  useUpdateProfileMutation,
  useCreatePetMutation,
} from '@/apis/onBoarding/onBoardingApi';
import {
  setStep1Completed,
  setStep2Completed,
  setStep3Completed,
  setStep4Completed,
  setProfileId,
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setStep4Data,
  setStep3IsUploading,
  setStep4IsUploading,
  selectOnBoarding,
  selectProfileId,
  selectStep1Data,
  selectStep2Data,
  selectStep3Data,
  selectStep4Data,
  selectStep3IsUploading,
  selectStep4IsUploading,
  resetOnboarding,
} from '@/apis/onBoarding/onBoardingSlice';
import {
  SOURCES,
  PET_TYPE,
  PET_GENDER,
  PET_TYPE_TYPES,
  PET_GENDER_TYPES,
  SOURCES_TYPES,
} from '@/lib/enums';
import { selectCurrentUser } from '@/apis/auth/authSlice';
import { COOKIE_MAX_AGE } from '@/constants';
import { useLazyGetCurrentUserQuery } from '@/apis/auth/authApi';
import { useUploadFileMutation } from '@/apis/fileUpload/fileUploadApi';

const TOTAL_STEPS = 4;

/**
 * useOnboarding Hook
 *
 * Centralized hook managing the complete customer onboarding flow.
 *
 * Step Flow:
 * - Step 1: Privacy & Terms Consent
 * - Step 2: Service Selection
 * - Step 3: Pet Information with Photo Upload
 * - Step 4: Health Snapshot with Document Upload
 *
 * Features:
 * - Profile completion detection and redirect
 * - Step navigation with access control
 * - File upload management (photos & documents)
 * - Form state persistence via Redux
 * - Combined Step 3 + Step 4 submission for pet creation
 * - Improved routing reliability
 *
 * @returns {Object} Hook methods and state for onboarding flow
 */
export function useOnboarding() {
  // =============================================================================
  // HOOKS & STATE
  // =============================================================================

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Redux selectors
  const { step1Completed } = useSelector(selectOnBoarding);
  const profileId = useSelector(selectProfileId);
  const step1Data = useSelector(selectStep1Data);
  const step2Data = useSelector(selectStep2Data);
  const step3Data = useSelector(selectStep3Data);
  const step4Data = useSelector(selectStep4Data);
  const step3IsUploading = useSelector(selectStep3IsUploading);
  const step4IsUploading = useSelector(selectStep4IsUploading);
  const currentUser = useSelector(selectCurrentUser);

  // Local state
  const [currentStep, setCurrentStep] = useState(() => {
    const urlStep = parseInt(searchParams.get('step') || '1', 10);
    if (urlStep >= 1 && urlStep <= TOTAL_STEPS) {
      if (urlStep === 1 && step1Completed) {
        return 2;
      }
      return urlStep;
    }
    return step1Completed ? 2 : 1;
  });

  // File upload state (for Step 3 and Step 4)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploadedPhotoData, setUploadedPhotoData] = useState<any>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);

  // API mutations
  const [
    getCurrentUser,
    {
      data: userProfile,
      isLoading: isCheckingOnboarding,
      isFetching: isRefetchingOnboardingProfile,
    },
  ] = useLazyGetCurrentUserQuery();
  const [initiateProfile, { isLoading: isInitiatingProfile }] = useInitiateProfileMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [createPet, { isLoading: isCreatingPet }] = useCreatePetMutation();
  const [uploadFile] = useUploadFileMutation();

  // React Hook Form
  const form = useForm<OnboardingFormData>({
    mode: 'onChange',
    defaultValues: {
      profileId: profileId || undefined,
      termsAccepted: step1Data?.termsAccepted || false,
      medicalDataConsent: step1Data?.medicalDataConsent || false,
      selectedService: step2Data?.selectedService || [],
      petName: '',
      petType: PET_TYPE.OTHER as PET_TYPE_TYPES,
      breed: '',
      gender: PET_GENDER.UNKNOWN as PET_GENDER_TYPES,
      age: 0,
      weight: 0,
      photo: null,
      enableMedicalHistory: step4Data?.enableMedicalHistory || false,
      allergies: step4Data?.allergies || [],
      chronicConditions: step4Data?.chronicConditions || [],
      previousDiagnosis: step4Data?.previousDiagnosis || [],
      documents: [],
    },
  });

  const { control, watch, setValue, formState } = form;

  // Restore photo state from Redux
  useEffect(() => {
    if (step3Data?.photoData && !uploadedPhotoData) {
      setUploadedPhotoData(step3Data.photoData);
      if (step3Data.photoData.path) {
        setPhotoUrl(step3Data.photoData.path);
      }
    }
  }, [step3Data?.photoData, uploadedPhotoData]);

  // =============================================================================
  // NAVIGATION & ROUTING
  // =============================================================================

  const updateStepInUrl = useCallback(
    (step: number) => {
      // Use replace to avoid back button issues
      const url = new URL(window.location.href);
      url.searchParams.set('step', step.toString());
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (profileId) {
      setValue('profileId', profileId);
    }
  }, [profileId, setValue]);

  // Profile initialization and step detection
  useEffect(() => {
    if (userProfile?.profile || currentUser?.profile) {
      const profile = userProfile?.profile || currentUser?.profile;

      // Set profile ID
      if (profile?._id && !profileId) {
        dispatch(setProfileId(profile._id));
      }

      const completedStep = profile?.onBoarding?.step || 0;

      // Restore Step 1 data
      if (profile?.customerInfo) {
        const step1FormData = {
          termsAccepted: profile.customerInfo.isAgreedToTerms || false,
          medicalDataConsent: profile.customerInfo.isAgreedToSharePetInfo || false,
        };

        dispatch(setStep1Data(step1FormData));
        setValue('termsAccepted', step1FormData.termsAccepted);
        setValue('medicalDataConsent', step1FormData.medicalDataConsent);
        if (step1FormData.termsAccepted && step1FormData.medicalDataConsent) {
          dispatch(setStep1Completed(true));
        }
      }

      // Restore Step 2 data
      if (profile?.customerInfo?.sources && profile.customerInfo.sources.length > 0) {
        const selectedServices = profile.customerInfo.sources.filter(Boolean) as SOURCES_TYPES[];
        const step2FormData = { selectedService: selectedServices };

        dispatch(setStep2Data(step2FormData));
        setValue('selectedService', selectedServices);

        if (selectedServices.length > 0) {
          dispatch(setStep2Completed(true));
        }
      }
    }
  }, [userProfile, profileId, dispatch, setValue, router, currentUser]);

  const nextButtonText = useMemo(() => {
    if (currentStep === 1) return 'Agree & Continue';
    if (currentStep === 4) return 'Complete Profile';
    return 'Next';
  }, [currentStep]);

  const canGoBack = useMemo(() => currentStep > 1, [currentStep]);

  // =============================================================================
  // STEP 1 - PRIVACY & TERMS
  // =============================================================================

  const handleStep1Submit = useCallback(
    async (saveAndExit = false) => {
      const step1Form = (window as any).__step1Form;
      if (!step1Form) {
        toast.error('Form not ready. Please try again.');
        return;
      }

      await step1Form.handleSubmit(
        async (data: { termsAccepted: boolean; medicalDataConsent: boolean }) => {
          const profileData = {
            customerInfo: {
              isAgreedToTerms: data.termsAccepted,
              isAgreedToSharePetInfo: data.medicalDataConsent,
            },
            onBoarding: {
              completed: true,
              step: 1,
            },
          };

          try {
            const response = await toast.promise(initiateProfile(profileData).unwrap(), {
              loading: 'Saving your preferences...',
              success: 'Profile initiated successfully!',
              error: 'Failed to save preferences',
            });

            if (response?._id) {
              dispatch(setProfileId(response._id));
              dispatch(
                setStep1Data({
                  termsAccepted: data.termsAccepted,
                  medicalDataConsent: data.medicalDataConsent,
                })
              );
              dispatch(setStep1Completed(true));

              // Set cookie for middleware
              if (typeof document !== 'undefined') {
                document.cookie = `has_profile=${response._id}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
              }

              await getCurrentUser(true);

              if (saveAndExit) {
                router.replace('/auth/register/onboarding/success');
              } else {
                const nextStep = 2;
                setCurrentStep(nextStep);
                updateStepInUrl(nextStep);
              }
            }
          } catch (error) {
            // Error already handled by toast.promise
          }
        }
      )();
    },
    [initiateProfile, dispatch, router, getCurrentUser, updateStepInUrl]
  );

  // =============================================================================
  // STEP 2 - SERVICE SELECTION
  // =============================================================================

  const handleServiceSelect = useCallback(
    (serviceId: SOURCES_TYPES, currentServices: SOURCES_TYPES[]) => {
      if (currentServices.includes(serviceId)) {
        return currentServices.filter((id) => id !== serviceId);
      } else {
        return [...currentServices, serviceId];
      }
    },
    []
  );

  const handleStep2Submit = useCallback(
    async (saveAndExit = false) => {
      await getCurrentUser(true);

      const step2Form = (window as any).__step2Form;
      if (!step2Form) {
        toast.error('Form not ready. Please try again.');
        return;
      }

      await step2Form.handleSubmit(async (data: { selectedService: SOURCES_TYPES[] }) => {
        if (!profileId) {
          toast.error('Profile ID not found. Please complete Step 1 first.');
          return;
        }

        const serviceToSourceMap: Record<SOURCES_TYPES, SOURCES_TYPES> = {
          IN_HOSPITAL: SOURCES.IN_HOSPITAL,
          TELEMEDICINE: SOURCES.TELEMEDICINE,
          HOME_VISIT: SOURCES.HOME_VISIT,
          PET_SERVICES: SOURCES.PET_SERVICES,
        };

        const mappedSources = data.selectedService.map(
          (service) => serviceToSourceMap[service]
        ) as SOURCES_TYPES[];

        const profileData = {
          customerInfo: {
            sources: mappedSources,
            isAgreedToTerms: step1Data?.termsAccepted,
            isAgreedToSharePetInfo: step1Data?.medicalDataConsent,
          },
          onBoarding: {
            completed: true,
            step: 2,
          },
        };

        try {
          const response = await toast.promise(updateProfile({ profileId, profileData }).unwrap(), {
            loading: 'Saving your service preferences...',
            success: 'Services saved successfully!',
            error: 'Failed to save services',
          });

          if (response?._id) {
            dispatch(
              setStep2Data({
                selectedService: data.selectedService,
              })
            );
            dispatch(setStep2Completed(true));

            if (typeof document !== 'undefined') {
              document.cookie = `has_profile=${response._id}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
            }

            await getCurrentUser(true);

            if (saveAndExit) {
              router.replace('/auth/register/onboarding/success');
            } else {
              const nextStep = 3;
              setCurrentStep(nextStep);
              updateStepInUrl(nextStep);
            }
          }
        } catch (error) {
          // Error already handled by toast.promise
        }
      })();
    },
    [updateProfile, router, profileId, dispatch, getCurrentUser, step1Data, updateStepInUrl]
  );

  // =============================================================================
  // STEP 3 - PET INFORMATION & PHOTO UPLOAD
  // =============================================================================

  const handlePhotoUpload = useCallback(
    (file: File) => {
      // Validate file size (max 2MB)
      const MAX_IMAGE_SIZE_MB = 2;
      const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        toast.error(`Image size cannot exceed ${MAX_IMAGE_SIZE_MB}MB`);
        return;
      }

      setValue('photo', file, { shouldValidate: true });

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);

      // Upload photo
      dispatch(setStep3IsUploading(true));
      const formData = new FormData();
      formData.append('file', file);

      uploadFile(formData)
        .unwrap()
        .then((response) => {
          const photoData = {
            id: response.id,
            path: response.path,
            fileName: response.fileName,
            fileSize: response.fileSize ? Number(response.fileSize) : Number(file.size),
          };
          setUploadedPhotoData(photoData);
          toast.success('Photo uploaded successfully!');
        })
        .catch((error) => {
          toast.error('Failed to upload photo');
        })
        .finally(() => {
          dispatch(setStep3IsUploading(false));
        });
    },
    [setValue, uploadFile, dispatch]
  );

  const handleStep3Next = useCallback(async () => {
    // Validate Step 3 form before moving to Step 4
    const step3Form = (window as any).__step3Form;
    if (!step3Form) {
      toast.error('Form not ready. Please try again.');
      return;
    }

    await step3Form.handleSubmit(async (data: any) => {
      // Form is valid, move to step 4
      const nextStep = 4;
      setCurrentStep(nextStep);
      updateStepInUrl(nextStep);
    })(new Event('submit') as any);
  }, [updateStepInUrl]);

  // =============================================================================
  // STEP 4 - HEALTH SNAPSHOT & DOCUMENT UPLOAD
  // =============================================================================

  const handleDocumentUpload = useCallback(
    async (files: File[]) => {
      const MAX_FILE_SIZE_MB = 5;
      const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

      const currentCount = uploadedDocuments.length;
      const availableSlots = 5 - currentCount;

      if (availableSlots <= 0) {
        toast.error('Maximum 5 documents allowed');
        return;
      }

      // Validate file sizes
      const invalidFiles = files.filter((file) => file.size > MAX_FILE_SIZE_BYTES);
      if (invalidFiles.length > 0) {
        const invalidFileNames = invalidFiles.map((f) => f.name).join(', ');
        toast.error(`File size cannot exceed ${MAX_FILE_SIZE_MB}MB: ${invalidFileNames}`);
        return;
      }

      const filesToUpload = files.slice(0, availableSlots);
      if (files.length > availableSlots) {
        toast.error(`Only ${availableSlots} more document(s) allowed`);
      }

      // Add files with uploading status
      const newDocuments: any[] = filesToUpload.map((file) => ({
        file,
        id: '',
        path: '',
        fileName: file.name,
        fileSize: file.size,
        isUploading: true,
        uploadProgress: 0,
      }));

      setUploadedDocuments((prev) => [...prev, ...newDocuments]);

      // Upload each file
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await uploadFile(formData).unwrap();

          setUploadedDocuments((prev) =>
            prev.map((doc) =>
              doc.file === file
                ? {
                    ...doc,
                    id: response.id,
                    path: response.path,
                    fileSize: Number(response.fileSize),
                    isUploading: false,
                    uploadProgress: 100,
                  }
                : doc
            )
          );
        } catch (error) {
          toast.error(`Failed to upload ${file.name}`);
          setUploadedDocuments((prev) => prev.filter((doc) => doc.file !== file));
        }
      }
    },
    [uploadedDocuments, uploadFile]
  );

  const handleRemoveDocument = useCallback((index: number) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleStep4Submit = useCallback(async () => {
    if (!step3Data) {
      toast.error('Pet information not found. Please go back to Step 3.');
      return;
    }

    // Validate required Step 3 fields
    if (!step3Data.petName || step3Data.petName.trim() === '') {
      toast.error('Pet name is required. Please go back to Step 3.');
      return;
    }

    if (!step3Data.petType) {
      toast.error('Pet type is required. Please go back to Step 3.');
      return;
    }

    if (step3IsUploading) {
      toast.error('Please wait for photo upload to complete');
      return;
    }

    if (step4IsUploading) {
      toast.error('Please wait for document upload to complete');
      return;
    }

    try {
      const customerId = currentUser?._id;

      if (!customerId) {
        toast.error('Customer ID not found. Please login again.');
        return;
      }

      // Map enums
      const petTypeMap: Record<PET_TYPE_TYPES, string> = {
        DOG: PET_TYPE.DOG,
        CAT: PET_TYPE.CAT,
        BIRD: PET_TYPE.BIRD,
        OTHER: PET_TYPE.OTHER,
      };

      const genderMap: Record<PET_GENDER_TYPES, string> = {
        MALE: PET_GENDER.MALE,
        FEMALE: PET_GENDER.FEMALE,
        UNKNOWN: PET_GENDER.UNKNOWN,
      };

      const enableMedicalHistory = step4Data?.enableMedicalHistory || false;
      const allergies = step4Data?.allergies || [];
      const chronicConditions = step4Data?.chronicConditions || [];
      const previousDiagnosis = step4Data?.previousDiagnosis || [];

      const uploadedDocs = (window as any).__step4UploadedDocuments || [];

      // Build pet payload
      const petPayload: any = {
        name: step3Data.petName,
        type: petTypeMap[step3Data.petType!],
        breed: step3Data.breed,
      };

      if (step3Data.gender && step3Data.gender in genderMap) {
        petPayload.gender = genderMap[step3Data.gender];
      } else {
        petPayload.gender = PET_GENDER.UNKNOWN;
      }

      petPayload.age = Number(step3Data.age);
      petPayload.weight = Number(step3Data.weight);

      if (uploadedPhotoData && uploadedPhotoData.id) {
        petPayload.profilePhoto = {
          id: uploadedPhotoData.id,
          path: uploadedPhotoData.path,
          fileName: uploadedPhotoData.fileName,
          fileSize: Number(uploadedPhotoData.fileSize),
        };
      }

      if (enableMedicalHistory) {
        petPayload.health = {
          allergies,
          chronicConditions,
          previousDiagnosis,
        };
      }

      if (uploadedDocs.length > 0) {
        petPayload.documents = uploadedDocs.map((doc: any) => ({
          id: doc.id,
          path: doc.path,
          fileName: doc.fileName,
          fileSize: Number(doc.fileSize),
        }));
      }

      const response = await toast.promise(createPet(petPayload).unwrap(), {
        loading: 'Saving pet information...',
        success: 'Pet information saved successfully!',
        error: 'Failed to save pet information',
      });

      // Update profile onboarding status
      if (profileId) {
        const profileUpdatePayload = {
          profileId,
          profileData: {
            onBoarding: {
              completed: true,
              step: 4,
            },
          },
        };

        await updateProfile(profileUpdatePayload).unwrap();
        await getCurrentUser(true);

        if (typeof document !== 'undefined') {
          document.cookie = `has_profile=${profileId}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
        }
      }

      dispatch(
        setStep3Data({
          petName: step3Data.petName,
          petType: step3Data.petType,
          breed: step3Data.breed,
          gender: step3Data.gender,
          age: step3Data.age,
          weight: step3Data.weight,
          photo: uploadedPhotoData?.path || null,
        })
      );
      dispatch(setStep3Completed(true));
      dispatch(setStep4Completed(true));

      // Store response for success screen
      if (typeof window !== 'undefined' && response) {
        sessionStorage.setItem('onboarding_submitted_data', JSON.stringify(response));
      }

      // Reset onboarding state
      dispatch(resetOnboarding());
      form.reset();

      router.replace('/auth/register/onboarding/success');
    } catch (error) {
      // Error already handled by toast.promise
    }
  }, [
    step3Data,
    step4Data,
    step3IsUploading,
    step4IsUploading,
    createPet,
    updateProfile,
    currentUser,
    dispatch,
    router,
    form,
    uploadedPhotoData,
    profileId,
    getCurrentUser,
  ]);

  // =============================================================================
  // NAVIGATION CONTROLS
  // =============================================================================

  const goToNextStep = useCallback(async () => {
    if (currentStep >= TOTAL_STEPS) return;
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    updateStepInUrl(nextStep);
  }, [currentStep, updateStepInUrl]);

  const goToPreviousStep = useCallback(
    (force = false) => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        updateStepInUrl(currentStep - 1);
      }
    },
    [currentStep, updateStepInUrl]
  );

  const goToStep = useCallback(
    (step: number, force = false) => {
      if (step >= 1 && step <= TOTAL_STEPS) {
        setCurrentStep(step);
        updateStepInUrl(step);
      }
    },
    [updateStepInUrl]
  );

  // =============================================================================
  // BUTTON HANDLERS
  // =============================================================================

  const handleSaveAndExit = useCallback(async () => {
    if (step3IsUploading || step4IsUploading) {
      toast.error('Please wait for upload to complete');
      return;
    }

    if (currentStep === 1) {
      await handleStep1Submit(true);
    } else if (currentStep === 2) {
      await handleStep2Submit(true);
    } else if (currentStep === 3) {
      if (profileId) {
        const profileUpdatePayload = {
          profileId,
          profileData: {
            onBoarding: {
              completed: false,
              step: 3,
            },
          },
        };
        await updateProfile(profileUpdatePayload).unwrap();
      }
      router.replace('/auth/register/onboarding/success');
    } else if (currentStep === 4) {
      await handleStep4Submit();
    }
  }, [
    currentStep,
    step3IsUploading,
    step4IsUploading,
    handleStep1Submit,
    handleStep2Submit,
    handleStep4Submit,
    router,
    updateProfile,
    profileId,
  ]);

  const handleNext = useCallback(async () => {
    if (step3IsUploading || step4IsUploading) {
      toast.error('Please wait for upload to complete');
      return;
    }

    if (currentStep === 1) {
      await handleStep1Submit(false);
    } else if (currentStep === 2) {
      await handleStep2Submit(false);
    } else if (currentStep === 3) {
      await handleStep3Next();
    } else if (currentStep === 4) {
      await handleStep4Submit();
    } else {
      await goToNextStep();
    }
  }, [
    currentStep,
    step3IsUploading,
    step4IsUploading,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Next,
    handleStep4Submit,
    goToNextStep,
  ]);

  const handleBack = useCallback(() => {
    goToPreviousStep();
  }, [goToPreviousStep]);

  const reset = useCallback(() => {
    form.reset();
    setCurrentStep(1);
  }, [form]);

  // =============================================================================
  // RETURN VALUES
  // =============================================================================

  return {
    // Form control
    control,
    watch,
    setValue,
    form,
    formState,

    // State
    currentStep,
    isSubmitting:
      isInitiatingProfile ||
      isUpdatingProfile ||
      isCreatingPet ||
      step3IsUploading ||
      step4IsUploading,
    isCheckingOnboarding: isCheckingOnboarding || isRefetchingOnboardingProfile,
    totalSteps: TOTAL_STEPS,
    step1Completed,

    // Navigation
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleNext,
    handleBack,
    handleSaveAndExit,

    // Button state
    canGoBack,
    nextButtonText,

    // Step 2 functions
    handleServiceSelect,

    // Step 3 functions
    photoUrl,
    uploadedPhotoData,
    handlePhotoUpload,

    // Step 4 functions
    uploadedDocuments,
    handleDocumentUpload,
    handleRemoveDocument,

    // Utility
    reset,
  };
}
