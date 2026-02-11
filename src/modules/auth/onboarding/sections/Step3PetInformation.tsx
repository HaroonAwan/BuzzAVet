'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { FormInput } from '@/components/form-inputs/Input';
import { FormSelect } from '@/components/form-inputs/Select';
import { DogIcon, CatIcon, BirdIcon, OthersIcon, AddPhotoIcon } from '@/assets/icon-components';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/Button';
import { PET_GENDER_TYPES, PET_TYPE, PET_TYPE_TYPES } from '@/lib/enums';
import { selectStep3Data, setStep3Data } from '@/apis/onBoarding/onBoardingSlice';
import { useOnboarding } from '../hooks/useOnboarding';
import {
  ageRule,
  breedRule,
  genderRule,
  nameRule,
  petTypeRule,
  photoRule,
  weightRule,
} from '@/lib/validationRules';

interface Step3FormData {
  petName: string;
  petType: PET_TYPE_TYPES;
  breed: string;
  gender: PET_GENDER_TYPES | null;
  age: number | null;
  weight: number | null;
  photo: File | null;
}

// Validation schema for Step 3
const step3Schema: yup.ObjectSchema<Step3FormData> = yup.object().shape({
  petName: nameRule,
  petType: petTypeRule,
  breed: breedRule,
  gender: genderRule,
  age: ageRule,

  weight: weightRule,
  photo: photoRule,
}) as yup.ObjectSchema<Step3FormData>;

const PetTypeIcon = ({ type, isSelected }: { type: PET_TYPE_TYPES; isSelected: boolean }) => {
  const iconColor = isSelected ? '#FFFFFF' : '#020409';
  const iconProps = { size: 24, iconColor };

  switch (type) {
    case PET_TYPE.DOG:
      return <DogIcon {...iconProps} />;
    case PET_TYPE.CAT:
      return <CatIcon {...iconProps} />;
    case PET_TYPE.BIRD:
      return <BirdIcon {...iconProps} />;
    case PET_TYPE.OTHER:
      return <OthersIcon {...iconProps} />;
    default:
      return null;
  }
};

const genderOptions = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'UNKNOWN', label: 'Unknown' },
];

const breedOptions = [
  { value: 'german-shepherd', label: 'German Shepherd' },
  { value: 'golden-retriever', label: 'Golden Retriever' },
  { value: 'labrador', label: 'Labrador' },
  { value: 'bulldog', label: 'Bulldog' },
  { value: 'persian', label: 'Persian' },
  { value: 'siamese', label: 'Siamese' },
  { value: 'maine-coon', label: 'Maine Coon' },
  { value: 'other', label: 'Other' },
];

/**
 * Step 3: Pet Information
 * User enters pet details and uploads photo
 */
export default function Step3PetInformation() {
  const dispatch = useDispatch();
  const step3Data = useSelector(selectStep3Data);
  const { photoUrl, uploadedPhotoData, handlePhotoUpload } = useOnboarding();

  const defaultFormValues: Step3FormData = {
    petName: step3Data?.petName || '',
    petType: step3Data?.petType || PET_TYPE.OTHER,
    breed: step3Data?.breed || '',
    gender: step3Data?.gender || ('MALE' as PET_GENDER_TYPES),
    age: step3Data?.age ?? null,
    weight: step3Data?.weight ?? null,
    photo: null,
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3FormData>({
    mode: 'onChange',
    resolver: yupResolver(step3Schema),
    defaultValues: defaultFormValues,
  });

  const petName = watch('petName');
  const petType = watch('petType');
  const breed = watch('breed');
  const gender = watch('gender');
  const age = watch('age');
  const weight = watch('weight');

  // Initialize form from Redux on mount ONLY
  React.useEffect(() => {
    if (step3Data) {
      if (step3Data.petName) setValue('petName', step3Data.petName);
      if (step3Data.petType) setValue('petType', step3Data.petType);
      if (step3Data.breed) setValue('breed', step3Data.breed);
      if (step3Data.gender) setValue('gender', step3Data.gender);
      if (step3Data.age !== null && step3Data.age !== undefined) setValue('age', step3Data.age);
      if (step3Data.weight !== null && step3Data.weight !== undefined)
        setValue('weight', step3Data.weight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save form data to Redux on changes
  React.useEffect(() => {
    dispatch(
      setStep3Data({
        petName,
        petType: petType as PET_TYPE_TYPES,
        breed,
        gender: gender as PET_GENDER_TYPES,
        age: age ? Number(age) : 0,
        weight: weight ? Number(weight) : 0,
        photoData: uploadedPhotoData,
      })
    );
  }, [petName, petType, breed, gender, age, weight, uploadedPhotoData, dispatch]);

  // Expose form to hook
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__step3Form = { control, handleSubmit, watch };
    }
  }, [control, handleSubmit, watch]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const isPhotoUploading = !uploadedPhotoData && photoUrl !== null;

  return (
    <div className="mt-3 flex w-full flex-1 flex-col">
      <h1 className="thirty-six mb-10 font-semibold" style={{ color: theme.colors.text.default }}>
        Tell us about your pet.
      </h1>

      <div className="flex-1 space-y-10">
        {/* Photo Upload and Pet Name */}
        <div className="flex items-start gap-6">
          <div className="relative shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer rounded-full opacity-0"
              id="pet-photo-upload"
              disabled={isPhotoUploading}
            />
            <div
              className={cn(
                'relative h-24 w-24 rounded-2xl border border-dashed',
                'flex flex-col items-center justify-center gap-1',
                'overflow-hidden transition-colors',
                photoUrl && 'border-solid',
                !isPhotoUploading && 'cursor-pointer'
              )}
              style={{
                borderColor: photoUrl ? theme.colors.defaultBorder : theme.colors.defaultBorder,
                backgroundColor: theme.colors.background.secondary,
              }}
            >
              {photoUrl ? (
                <img src={photoUrl} alt="Pet" className="h-full w-full object-cover" />
              ) : (
                <>
                  <AddPhotoIcon size={32} />
                  <span className="text-xs" style={{ color: theme.colors.text.secondary }}>
                    Add Photo
                  </span>
                </>
              )}

              {isPhotoUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <FormInput<Step3FormData>
              control={control}
              name="petName"
              label="Pet Name *"
              placeholder="Enter pet name"
            />
          </div>
        </div>

        {/* Pet Type */}
        <div>
          <label className="mb-3 block text-sm font-medium">
            What kind of pet is {petName || 'your pet'}? *
          </label>
          <div className="flex flex-wrap gap-3 md:justify-between">
            {([PET_TYPE.DOG, PET_TYPE.CAT, PET_TYPE.BIRD, PET_TYPE.OTHER] as PET_TYPE_TYPES[]).map(
              (type) => {
                const isSelected = petType === type;
                const labels: Record<PET_TYPE_TYPES, string> = {
                  DOG: 'Dog',
                  CAT: 'Cat',
                  BIRD: 'Bird',
                  OTHER: 'Others',
                };
                return (
                  <Button
                    key={type}
                    onClick={() => setValue('petType', type, { shouldValidate: true })}
                    variant={isSelected ? 'pill' : 'outline'}
                    size="lg"
                    icon={<PetTypeIcon type={type} isSelected={isSelected} />}
                    iconPlacement="start"
                    iconVisibility="always"
                    className="w-[calc(25%-0.75rem)] min-w-30 grow rounded-2xl md:max-w-50"
                  >
                    {labels[type]}
                  </Button>
                );
              }
            )}
          </div>
          {errors.petType && (
            <p className="mt-2 text-sm" style={{ color: theme.colors.error }}>
              {errors.petType.message}
            </p>
          )}
        </div>

        {/* Breed and Gender */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormSelect<Step3FormData>
            control={control}
            name="breed"
            label="Breed *"
            options={breedOptions}
            placeholder="Select"
          />

          <FormSelect<Step3FormData>
            control={control}
            name="gender"
            label="Gender *"
            options={genderOptions}
            placeholder="Select"
          />
        </div>

        {/* Age and Weight */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput<Step3FormData>
            control={control}
            name="age"
            label="Age (Years) *"
            placeholder="0"
            type="number"
            min="0"
            max="100"
          />

          <FormInput<Step3FormData>
            control={control}
            name="weight"
            label="Weight (KG) *"
            placeholder="0"
            type="number"
            min="0"
            max="150"
          />
        </div>
      </div>
    </div>
  );
}
