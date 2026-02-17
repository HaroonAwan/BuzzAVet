export interface HospitalsNearYouQuery {
  page?: number;
  perPage?: number;
  withPopulate?: boolean;
  miles?: number;
}
export interface HospitalPrice{
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
