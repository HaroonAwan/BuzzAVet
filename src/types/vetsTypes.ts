import { UploadedDocument } from '@/components/shared/dialogs/home/useAddNotes';
import { SERVICE_TYPE_TYPES } from '@/lib/enums';

export interface VetsResponse {
  data: Vet[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface Vet {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  portalType: string;
  role: string;
  savedShifts: string[];
  timeZone: string;
  status: string;
  stConnectAccountComplete: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  verificationEmailSentAt: string | null;
  profile: VetProfile;
  profilePicture: string;
  profilePictureId: string;
  ratings?: number;
  noOfTotalReviews?: number;
  secondCancel?: string;
  firstCancel?: string;
  distanceInMeters?: number;
  distanceInMiles?: number;
  isFavorite?: boolean;
  fromGoogle?: boolean;
}

export interface VetProfile {
  _id: string;
  createdAt: string;
  updatedAt: string;
  personalInformation: {
    phone?: string;
    address?: VetAddress;
    gender?: string;
    languages?: string[];
    about?: string;
  };

  education: VetEducation[];
  licenses: VetLicense[];
  techLicenses: any[];
  experience: {
    yearOfPractice?: string;
  };
  specialties: {
    certifiedVeterinarySpecialist: string[];
  };
  areaOfExpertise: {
    typesOfAnimals: string[];
    typesOfProcedures: string[];
  };
  preferences: {
    latexAllergies?: boolean;
    canPickMOreThenFiftyPounds?: boolean;
    sensitiveToLoudNoises?: boolean;
    anyOtherAllergies?: boolean;
    comfortableWithEuthanasia?: boolean;
  };
  team: string[];
  documents: {
    profilePhoto?: VetDocument;
    drivingLicensePhoto?: VetDocument;
  };
  businessDetails?: {
    name?: string;
    number?: string;
    llcNumber?: string;
    role?: string;
  };
  onBoarding: {
    completed: boolean;
    step: number;
  };
  location: {
    type: string;
    coordinates: number[];
  };
  isSearchable: boolean;
  telemedicine: {
    isVisible: boolean;
    pricing: {
      per30MinPrice?: number;
      per10MinPrice?: number;
    };
    businessInfoLink?: string;
    allowPrescriptions?: boolean;
  };
  mobileVet: {
    isVisible: boolean;
    pricing: {
      per30MinPrice?: number;
      per10MinPrice?: number;
      consultantBasePrice?: number;
      per5MilesPrice?: number;
      per10MilesPrice?: number;
      per10PlusMilesPrice?: number;
    };
    iHaveSupplies?: boolean;
    findMe?: boolean;
    buySupplies?: boolean;
  };
  customerInfo?: {
    isAgreedToTerms?: boolean;
    isAgreedToSharePetInfo?: boolean;
    sources?: string[];
    aboutMe?: string;
  };
}

export interface VetAddress {
  address?: string;
  suite?: string;
  streetName?: string;
  streetNumber?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface VetEducation {
  school: string;
  graduationYear: string;
  aboutMe: string;
}

export interface VetLicense {
  state: string;
  number: string;
  expirationMonth: string;
  expirationYear: string;
}

export interface VetDocument {
  id: string;
  path: string;
  fileName: string;
  fileSize: number;
}

export interface VetsNearYouBody {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  gender?: string[];
  languages?: string[];
}

export interface VetsNearYouQuery {
  page?: number;
  perPage?: number;
  withPopulate?: boolean;
  serviceType?: SERVICE_TYPE_TYPES;
  miles?: number;
  fetchTopRated?: boolean;
}
