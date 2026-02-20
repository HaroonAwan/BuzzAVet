export interface DropdownOption {
  _id: string;
  type: string;
  title: string;
  slug: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: any;
}

export type HospitalServiceOption = DropdownOption;
