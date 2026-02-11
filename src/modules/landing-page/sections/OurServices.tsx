import SectionsWrapper from '@/layouts/SectionsWrapper';
import InfoWrapper from '../layouts/InfoWrapper';
import HospitalImage from '@/assets/images/auth/hospital.png';
import TelemedicineImage from '@/assets/images/auth/telemed.png';
import HomeVisitImage from '@/assets/images/auth/home.png';
import PetServicesImage from '@/assets/images/auth/pet.png';
import { theme } from '@/lib/theme';
import Image from 'next/image';

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: 'Hospital Appointments',
      icon: HospitalImage,
      description:
        'Book in-person appointments at our state-of-the-art veterinary hospitals with experienced professionals.',
    },
    {
      id: 2,
      title: 'Telemedicine',
      icon: TelemedicineImage,
      description:
        'Connect with licensed vets online for consultations, follow-ups, and non-emergency care from home.',
    },
    {
      id: 3,
      title: 'Mobile Vet Services',
      icon: HomeVisitImage,
      description:
        'Our mobile vet come to your home for convenient, stress-free care for your pets.',
    },
    {
      id: 4,
      title: 'Pet Services',
      icon: PetServicesImage,
      description:
        'Comprehensive pet care including grooming, boarding, training, and wellness programs.',
    },
  ];

  return (
    <SectionsWrapper noContainer className="bg-[#F9FAFB]">
      <InfoWrapper
        sectionTitle="Our Services"
        title="Complete Care for Your Beloved Pets"
        subTitle="From routine checkups to emergency care, we offer a full range of veterinary services tailored to your pet's needs."
      >
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center"
            >
              <div className="mb-5">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: theme.colors.background.teal }}
                >
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{ color: theme.colors.text.default }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.colors.text.tertiary }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </InfoWrapper>
    </SectionsWrapper>
  );
};

export default OurServices;
