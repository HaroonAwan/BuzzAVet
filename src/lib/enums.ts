export const enum SOURCES {
  IN_HOSPITAL = 'IN_HOSPITAL',
  TELEMEDICINE = 'TELEMEDICINE',
  HOME_VISIT = 'HOME_VISIT',
  PET_SERVICES = 'PET_SERVICES',
}
export type SOURCES_TYPES = keyof typeof SOURCES;

export const enum PET_TYPE {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  // FISH = 'FISH',
  // REPTILE = 'REPTILE',
  // SMALL_ANIMAL = 'SMALL_ANIMAL',
  OTHER = 'OTHER',
}
export type PET_TYPE_TYPES = keyof typeof PET_TYPE;

export const enum PET_GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}
export type PET_GENDER_TYPES = keyof typeof PET_GENDER;
