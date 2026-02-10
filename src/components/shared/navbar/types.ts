export type ServiceCategory = 'hospital' | 'telemedicine' | 'mobile' | 'services';
export type ViewType = 'list' | 'map';

export interface RecentSearch {
  id: string;
  location: string;
}

export interface RecentServiceSearch {
  id: string;
  service: string;
}

export interface ServiceCategoryConfig {
  id: ServiceCategory;
  label: string;
  image: any;
  route: string;
}
