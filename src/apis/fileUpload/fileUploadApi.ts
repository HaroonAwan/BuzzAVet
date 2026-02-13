import { baseApi } from '@/apis/baseApi';
import { ApiEndpoints } from '../endpoints';
import type { FileUpload } from '@/types/onboarding';

const { UPLOAD } = ApiEndpoints.FILE_UPLOAD;

export const fileUploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileUpload, FormData>({
      query: (formData) => ({
        url: UPLOAD,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadApi;
