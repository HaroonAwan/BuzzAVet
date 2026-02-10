import { PET_GENDER_TYPES, PET_TYPE_TYPES, SOURCES_TYPES } from '@/lib/enums';

export interface FileUpload {
  id: string;
  path: string;
  fileName: string;
  fileSize: string;
}

export interface PetOnboardingPayload {
  name: string;
  profilePhoto?: FileUpload;
  type: string;
  breed: string;
  gender: string;
  age: number;
  weight: number;
  health?: {
    allergies: string[];
    chronicConditions: string[];
    previousDiagnosis: string[];
  };
  documents?: FileUpload[];
  isVerified?: boolean;
}

export interface PetOnboardingResponse {
  _id: string;
  name: string;
  customerId: string;
  type: string;
  breed: string;
  gender: string;
  age: number;
  weight: number;
}

export interface OnboardingFormData {
  // Profile ID (saved in Step 1, used in Step 2+)
  profileId?: string;
  // Step 1
  termsAccepted: boolean;
  medicalDataConsent: boolean;
  // Step 2
  selectedService: SOURCES_TYPES[];
  // Step 3
  petName: string;
  petType: PET_TYPE_TYPES | null;
  breed: string;
  gender: PET_GENDER_TYPES | null;
  age: number | null;
  weight: number | null;
  photo: File | string | null;
  // Step 4
  enableMedicalHistory: boolean;
  allergies: string[];
  chronicConditions: string[];
  previousDiagnosis: string[];
  documents: File[] | string[];
}

export interface OnboardingState {
  currentStep: number;
  isSubmitting: boolean;
  submittedData: OnboardingFormData | null;
}

export interface PROFILE_INITIATION_PAYLOAD {
  _id?: string;
  personalInformation?: {
    _id?: string;
    phone?: string;
    address?: {
      postalCode?: string;
      suite?: string;
      streetName?: string;
      streetNumber?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
  };
  onBoarding?: {
    completed?: boolean;
    step?: number;
  };
  isSearchable?: boolean;
  location?: {
    type?: string;
    coordinates?: [number, number];
  };
  customerInfo?: {
    isAgreedToTerms?: boolean;
    isAgreedToSharePetInfo?: boolean;
    sources?: SOURCES_TYPES[];
    aboutMe?: string;
  };
  education?: Array<{
    school?: string;
    graduationYear?: string;
    aboutMe?: string;
  }>;
  licenses?: Array<{
    state?: string;
    number?: string;
    expirationMonth?: string;
    expirationYear?: string;
    image?: string;
  }>;
  techLicenses?: string[];
  experience?: {
    yearOfPractice?: string;
  };
  specialties?: {
    certifiedVeterinarySpecialist?: string[];
    text?: string;
  };
  areaOfExpertise?: {
    typesOfAnimals?: string[];
    typesOfProcedures?: string[];
  };
  preferences?: {
    latexAllergies?: boolean;
    canPickMOreThenFiftyPounds?: boolean;
    sensitiveToLoudNoises?: boolean;
    anyOtherAllergies?: boolean;
    comfortableWithEuthanasia?: boolean;
  };
  team?: string[];
  documents?: {
    profilePhoto?: {
      id?: string;
      path?: string;
      fileName?: string;
      fileSize?: number;
    };
    drivingLicensePhoto?: {
      id?: string;
      path?: string;
      fileName?: string;
      fileSize?: number;
    };
    resume?: {
      id?: string;
      path?: string;
      fileName?: string;
      fileSize?: number;
    };
  };
  businessDetails?: {
    name?: string;
    number?: string;
    llcNumber?: string;
    role?: string;
    others?: string;
  };
}

export interface PROFILE_INITIATION_RESPONSE {
  statusCode?: number;
  message?: string;
  error?: string;
  _id?: string;
}
