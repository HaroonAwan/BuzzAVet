import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageRule, nameRule, photoRule } from '@/lib/validationRules';
import { useUploadFileMutation } from '@/apis/fileUpload/fileUploadApi';
import toast from 'react-hot-toast';
import { useUpdateProfileMutation } from '@/apis/onBoarding/onBoardingApi';
import { selectCurrentUser } from '@/apis/auth/authSlice';
import { useSelector } from 'react-redux';
import { useLazyGetCurrentUserQuery } from '@/apis/auth/authApi';

export interface PersonalInfoFormData {
  fullName: string;
  aboutMe: string;
  photo: File | string | null;
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
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const currentUser = useSelector(selectCurrentUser);
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const {
    control,
    handleSubmit,
    setValue,
    watch,

    formState: { errors, isDirty },
  } = useForm<PersonalInfoFormData>({
    mode: 'onChange',
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      fullName: currentUser ? `${currentUser.firstName} ${currentUser.lastName ?? ''}` : '',
      aboutMe:
        currentUser && currentUser.profile && 'aboutMe' in currentUser.profile
          ? String(currentUser.profile.aboutMe ?? '')
          : '',
      photo:
        currentUser &&
        currentUser.profile &&
        currentUser.profile.documents &&
        currentUser.profile.documents.profilePhoto
          ? currentUser.profile.documents.profilePhoto.path
          : null,
    },
  });

  const fullName = watch('fullName');
  const photo = watch('photo');
  React.useEffect(() => {
    if (photo && typeof photo === 'string') {
      setAvatarPreview(photo);
    }
  }, [photo]);

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
          })
          .catch((error) => {
            toast.error('Failed to upload photo');
            setAvatarPreview(null);
            setValue('photo', null);
          });
      }
    },
    [setValue, uploadFile]
  );

  const onSubmit = (data: PersonalInfoFormData) => {
    const profileId = currentUser?.profile?._id;
    if (!profileId) {
      toast.error('User profile not found');
      return;
    }
    // split full name into first and last name on first space
    const [firstName, ...lastNameParts] = data.fullName.trim().split(' ');
    const lastName = lastNameParts.join(' ');
    const payload = {
      profileId,
      profileData: {
        documents: { profilePhoto: uploadedPhotoData },
        customerInfo: {
          firstName,
          lastName,
          isAgreedToTerms: currentUser?.profile?.customerInfo?.isAgreedToTerms ?? false,
          isAgreedToSharePetInfo:
            currentUser?.profile?.customerInfo?.isAgreedToSharePetInfo ?? false,
          sources: currentUser?.profile?.customerInfo?.sources ?? [],
          aboutMe: data.aboutMe,
        },
      },
    };
    console.log('🚀 ~ onSubmit ~ payload:', payload);

    updateProfile(payload)
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully!');
        getCurrentUser(true);
      })
      .catch(() => {
        toast.error('Failed to update profile');
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
    isDirty,
  };
};
