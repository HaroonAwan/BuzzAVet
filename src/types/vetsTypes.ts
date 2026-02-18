import { SERVICE_TYPE_TYPES } from '@/lib/enums';
export interface VetApiResponse {
  [key: string]: any;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fcmTokens?: string[];
  portalType?: string;
  role?: string;
  savedShifts?: string[];
  timeZone?: string;
  stripeCusId?: string;
  status?: string;
  stConnectAccountComplete?: boolean;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  verificationEmailSentAt?: string;
  profile?: {
    [key: string]: any;
    _id?: string;
    personalInformation?: {
      [key: string]: any;
      phone?: string;
      address?: {
        [key: string]: any;
        address?: string;
        suite?: string;
        streetName?: string;
        streetNumber?: string;
        city?: string;
        state?: string;
        zip?: string;
      };
    };
    team?: string[];
    onBoarding?: {
      [key: string]: any;
      completed?: boolean;
      step?: number;
    };
    education?: Array<{
      [key: string]: any;
      school?: string;
      graduationYear?: string;
      aboutMe?: string;
    }>;
    licenses?: Array<{
      [key: string]: any;
      state?: string;
      number?: string;
      expirationMonth?: string;
      expirationYear?: string;
    }>;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    areaOfExpertise?: {
      [key: string]: any;
      typesOfAnimals?: string[];
      typesOfProcedures?: string[];
    };
    experience?: {
      [key: string]: any;
      yearOfPractice?: string;
    };
    specialties?: {
      [key: string]: any;
      certifiedVeterinarySpecialist?: string[];
    };
    preferences?: {
      [key: string]: any;
      latexAllergies?: boolean;
      canPickMOreThenFiftyPounds?: boolean;
      sensitiveToLoudNoises?: boolean;
      anyOtherAllergies?: boolean;
      comfortableWithEuthanasia?: boolean;
    };
    documents?: {
      [key: string]: any;
      profilePhoto?: {
        [key: string]: any;
        id?: string;
        path?: string;
        fileName?: string;
        fileSize?: number;
      };
      drivingLicensePhoto?: {
        [key: string]: any;
        id?: string;
        path?: string;
        fileName?: string;
        fileSize?: number;
      };
    };
    techLicenses?: any[];
    location?: {
      [key: string]: any;
      type?: string;
      coordinates?: number[];
    };
    isSearchable?: boolean;
    businessDetails?: {
      [key: string]: any;
      name?: string;
      number?: string;
      llcNumber?: string;
      role?: string;
    };
    mobileVet?: {
      [key: string]: any;
      isVisible?: boolean;
      pricing?: {
        [key: string]: any;
        per30MinPrice?: number;
        per10MinPrice?: number;
      };
    };
    telemedicine?: {
      [key: string]: any;
      isVisible?: boolean;
      pricing?: {
        [key: string]: any;
        per30MinPrice?: number;
        per10MinPrice?: number;
      };
      businessInfoLink?: string;
      allowPrescriptions?: boolean;
    };
  };
  profilePicture?: string;
  profilePictureId?: string;
  stripeAccId?: string;
  ratings?: number;
  noOfTotalReviews?: number;
  secondCancel?: string;
  firstCancel?: string;
}

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
