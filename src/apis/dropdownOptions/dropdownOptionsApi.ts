import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import type { HospitalServiceOption } from '@/types/dropdownOptions';

const { HOSPITAL_SERVICES } = ApiEndpoints.DROPDOWN_OPTIONS;

export const dropdownOptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitalServices: builder.query<HospitalServiceOption[], void>({
      query: () => ({
        url: HOSPITAL_SERVICES,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetHospitalServicesQuery } = dropdownOptionsApi;
