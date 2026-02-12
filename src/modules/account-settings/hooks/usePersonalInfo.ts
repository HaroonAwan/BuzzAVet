import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageRule, nameRule, photoRule } from '@/lib/validationRules';
import { useUploadFileMutation } from '@/apis/fileUpload/fileUploadApi';
import toast from 'react-hot-toast';

export interface PersonalInfoFormData {
  fullName: string;
  aboutMe: string;
  photo: File | null;
}

const personalInfoSchema: yup.ObjectSchema<PersonalInfoFormData> = yup.object().shape({
  fullName: nameRule,
  aboutMe: messageRule,
  photo: photoRule,
}) as yup.ObjectSchema<PersonalInfoFormData>;

export const usePersonalInfo = () => {
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [uploadedPhotoData, setUploadedPhotoData] = React.useState<any>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadFile] = useUploadFileMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    mode: 'onChange',
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      aboutMe: '',
      photo: null,
    },
  });

  const fullName = watch('fullName');

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Validate file size (max 2MB)
        const MAX_IMAGE_SIZE_MB = 2;
        const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          toast.error(`Image size cannot exceed ${MAX_IMAGE_SIZE_MB}MB`);
          return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          toast.error('Only JPEG and PNG images are allowed');
          return;
        }

        setValue('photo', file, { shouldValidate: true });

        // Create preview URL
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);

        // Upload photo immediately
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        uploadFile(formData)
          .unwrap()
          .then((response) => {
            const photoData = {
              id: response.id,
              path: response.path,
              fileName: response.fileName,
              fileSize: response.fileSize ? Number(response.fileSize) : Number(file.size),
            };
            setUploadedPhotoData(photoData);
            toast.success('Photo uploaded successfully!');
          })
          .catch((error) => {
            toast.error('Failed to upload photo');
            setAvatarPreview(null);
            setValue('photo', null);
          })
          .finally(() => {
            setIsUploading(false);
          });
      }
    },
    [setValue, uploadFile]
  );

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log('Form Values:', {
      fullName: data.fullName,
      aboutMe: data.aboutMe,
      photo: uploadedPhotoData,
    });
  };

  return {
    // Form control
    control,
    handleSubmit,
    errors,
    fullName,

    // Avatar state
    avatarPreview,
    isHovering,
    setIsHovering,
    isUploading,
    fileInputRef,

    // Handlers
    handleAvatarClick,
    handleImageChange,
    onSubmit,
  };
};
