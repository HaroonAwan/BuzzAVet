export interface HospitalDetailsResponse {
  _id: string;
  basicInformation: HospitalBasicInformation & { [key: string]: any };
  location: HospitalLocation & { [key: string]: any };
  managements: HospitalManagement[];
  onBoarding: HospitalOnBoarding & { [key: string]: any };
  isVerified: boolean;
  owner: HospitalOwner & { [key: string]: any };
  createdAt: string;
  updatedAt: string;
  __v: number;
  details: HospitalDetails & { [key: string]: any };
  preferences: HospitalPreferences & { [key: string]: any };
  documents: HospitalDocuments & { [key: string]: any };
  ratings: number;
  noOfTotalReviews: number;
  status: string;
  isVisible: boolean;
  pricing: HospitalPricing & { [key: string]: any };
  isFavorite: boolean;
  vets: any[];
  reviews: HospitalReview[];
  [key: string]: any;
}

export interface HospitalBasicInformation {
  name: string;
  phone: string;
  website: string;
  address: HospitalAddress & { [key: string]: any };
  [key: string]: any;
}

export interface HospitalAddress {
  address: string;
  unit: string;
  city: string;
  streetName: string;
  streetNumber: string;
  state: string;
  zip: string;
  [key: string]: any;
}

export interface HospitalLocation {
  type: string;
  coordinates: number[];
  [key: string]: any;
}

export interface HospitalManagement {
  _id: string;
  hospital: string;
  invitedBy: string;
  toUser: string;
  email: string;
  role: string;
  status: string;
  invitedByVet: boolean;
  invitedByHospital: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: any;
}

export interface HospitalOnBoarding {
  completed: boolean;
  step: number;
  [key: string]: any;
}

export interface HospitalOwner {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fcmTokens: string[];
  portalType: string;
  role: string;
  savedShifts: any[];
  timeZone: string;
  stripeCusId: string;
  status: string;
  stConnectAccountComplete: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  verificationEmailSentAt: string | null;
  stripeAccId: string;
  stPaymentMethodId: string;
  [key: string]: any;
}

export interface HospitalDetails {
  type: string;
  noOfDVMsPerDay: string;
  managementSoftware: string;
  maintainRecords: string;
  dressCode: string;
  isFearFreeCertified: boolean;
  isAAHAACertified: boolean;
  isActivelyLookingForHiring: boolean;
  [key: string]: any;
}

export interface HospitalPreferences {
  appointmentConsistOf: string[];
  standardAppointFlow: string;
  animals: any[];
  hospitalAmenities: string;
  parkingSituation: string;
  hospitalPersonality: string;
  [key: string]: any;
}

export interface HospitalDocuments {
  profilePicture: HospitalProfilePicture & { [key: string]: any };
  [key: string]: any;
}

export interface HospitalProfilePicture {
  id: string;
  path: string;
  fileName: string;
  fileSize: number;
  [key: string]: any;
}

export interface HospitalPricing {
  basePrice: number;
  [key: string]: any;
}

export interface HospitalReview {
  _id: string;
  ratings: number;
  review: string;
  reviewedBy: string;
  shift: string;
  hospital: string;
  person: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviewer: HospitalReviewer & { [key: string]: any };
  [key: string]: any;
}

export interface HospitalReviewer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  portalType: string;
  role: string;
  savedShifts: any[];
  timeZone: string;
  status: string;
  stConnectAccountComplete: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  verificationEmailSentAt: string | null;
  profile: string;
  profilePicture: string;
  profilePictureId: string;
  ratings: number;
  noOfTotalReviews: number;
  secondCancel?: string;
  firstCancel?: string;
  fromGoogle?: boolean;
  [key: string]: any;
}
export interface HospitalsNearYouQuery {
  page?: number;
  perPage?: number;
  withPopulate?: boolean;
  miles?: number;
}
export interface HospitalPrice {
  basePrice: number;
}

export interface HospitalsNearYouBody {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxMiles?: number;
  medicalServices?: string[];
  facilities?: string[];
  animals?: string[];
  isVerified?: boolean;
  isVisible?: boolean;
}

export interface Hospital {
  [key: string]: any;
}

export interface HospitalsNearYouResponse {
  data: Hospital[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}
export interface HospitalDetailsQuery {
  withVets?: boolean;
  withVetProfiles?: boolean;
  withReviews?: boolean;
  withReviewers?: boolean;
}

export interface FavoritesQuery {
  itemType: string;
}
