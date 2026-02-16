'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import HospitalImage from '@/assets/images/auth/hospital.png';
import TelemedicineImage from '@/assets/images/auth/telemed.png';
import HomeVisitImage from '@/assets/images/auth/home.png';
import PetServicesImage from '@/assets/images/auth/pet.png';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { SOURCES, SOURCES_TYPES } from '@/lib/enums';
import { selectStep2Data, setStep2Data } from '@/apis/onBoarding/onBoardingSlice';
import { selectedServiceRule } from '@/lib/validationRules';
import { useGetCurrentUserQuery } from '@/apis/auth/authApi';

const step2Schema = yup.object().shape({
  selectedService: selectedServiceRule,
});

interface Step2FormData {
  selectedService: SOURCES_TYPES[];
}

interface ServiceCard {
  id: SOURCES_TYPES;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceCard[] = [
  {
    id: SOURCES.IN_HOSPITAL,
    title: 'In Hospital Visit',
    description: 'Book appointments nearby',
    icon: <img src={HospitalImage.src} alt="Hospital" width={64} height={64} />,
  },
  {
    id: SOURCES.TELEMEDICINE,
    title: 'Telemedicine',
    description: 'Video chat with a vet',
    icon: <img src={TelemedicineImage.src} alt="Telemedicine" width={64} height={64} />,
  },
  {
    id: SOURCES.MOBILE_VET,
    title: 'Home Visit',
    description: 'Vet comes to you',
    icon: <img src={HomeVisitImage.src} alt="Home Visit" width={64} height={64} />,
  },
  {
    id: SOURCES.PET_SERVICES,
    title: 'Pet Services',
    description: 'Contact Pet Care',
    icon: <img src={PetServicesImage.src} alt="Pet Services" width={64} height={64} />,
  },
];

/**
 * Step 2: Service Selection
 * User selects services they're interested in
 */
export default function Step2ServiceSelection() {
  const dispatch = useDispatch();
  const step2Data = useSelector(selectStep2Data);
  const { data: userData } = useGetCurrentUserQuery(true);
  console.log('🚀 ~ Step1Privacy ~ userData:', userData);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2FormData>({
    mode: 'onChange',
    resolver: yupResolver(step2Schema),
    defaultValues: {
      selectedService: step2Data?.selectedService || [],
    },
  });

  const selectedServices = watch('selectedService') || [];

  // Save form data to Redux on changes
  React.useEffect(() => {
    dispatch(
      setStep2Data({
        selectedService: selectedServices,
      })
    );
  }, [selectedServices, dispatch]);

  // Expose form to hook
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__step2Form = { control, handleSubmit, watch };
    }
  }, [control, handleSubmit, watch]);

  const handleServiceSelect = (serviceId: SOURCES_TYPES) => {
    const currentServices = selectedServices || [];
    if (currentServices.includes(serviceId)) {
      setValue(
        'selectedService',
        currentServices.filter((id) => id !== serviceId),
        { shouldValidate: true }
      );
    } else {
      setValue('selectedService', [...currentServices, serviceId], { shouldValidate: true });
    }
  };

  return (
    <div className="mt-3 flex w-full flex-1 flex-col">
      <h1 className="thirty-six mb-10 font-semibold" style={{ color: theme.colors.text.default }}>
        What brings you to BuzzAVet?
      </h1>
      {errors.selectedService && (
        <p className="mt-2 mb-4 text-sm" style={{ color: theme.colors.error }}>
          {errors.selectedService?.message || 'Please select at least one service'}
        </p>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceSelect(service.id)}
              className={cn(
                'flex items-center justify-start gap-1.5 rounded-2xl border-[1.7px] p-6 transition-all',
                'cursor-pointer'
              )}
              style={{
                borderColor: isSelected ? theme.colors.active : theme.colors.border.default,
                backgroundColor: isSelected
                  ? theme.colors.background.tertiary
                  : theme.colors.background.default,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = theme.colors.border.secondary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = theme.colors.border.default;
                }
              }}
            >
              <div className={cn('shrink-0', isSelected ? 'opacity-100' : 'opacity-70')}>
                {service.icon}
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <h3
                  className="text-[18px] font-semibold"
                  style={{ color: theme.colors.text.default }}
                >
                  {service.title}
                </h3>
                <p className="text-left text-[14px]" style={{ color: theme.colors.text.secondary }}>
                  {service.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
