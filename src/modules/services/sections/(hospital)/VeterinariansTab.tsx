import { TelemedicineCard, TelemedicineCardProps } from '@/modules/home/layouts/TelemedicineCard';
export const initialTelemedicineDoctors: TelemedicineCardProps[] = [
  {
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    clinicName: 'City Paws Medical Center',
    nextAvailable: 'Tomorrow, 10:00 AM',
    rating: 4.8,
    fee: 50,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    clinicName: 'Heart & Paw Veterinary',
    nextAvailable: 'Today, 2:00 PM',
    rating: 4.9,
    fee: 75,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialization: 'Oncology',
    clinicName: 'Paw Care Specialists',
    nextAvailable: 'Tomorrow, 11:00 AM',
    rating: 4.7,
    fee: 60,
    favorite: true,
    imageSrc:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    clinicName: 'Bone & Joint Veterinary',
    nextAvailable: 'Today, 4:00 PM',
    rating: 4.9,
    fee: 80,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Lisa Anderson',
    specialization: 'Neurology',
    clinicName: 'Brain & Spine Pet Care',
    nextAvailable: 'Tomorrow, 9:00 AM',
    rating: 4.8,
    fee: 70,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Robert Martinez',
    specialization: 'Internal Medicine',
    clinicName: 'Comprehensive Pet Health',
    nextAvailable: 'Today, 3:00 PM',
    rating: 4.9,
    fee: 65,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1646157269839-f722cb7a7df3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialization: 'Internal Medicine',
    clinicName: 'Comprehensive Pet Health',
    nextAvailable: 'Today, 3:00 PM',
    rating: 4.9,
    fee: 65,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1700308436362-04fd247cc35d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dr. James Wilson',
    specialization: 'Internal Medicine',
    clinicName: 'Comprehensive Pet Health',
    nextAvailable: 'Today, 3:00 PM',
    rating: 4.9,
    fee: 65,
    favorite: false,
    imageSrc:
      'https://images.unsplash.com/photo-1551601651-05a4836d25c2?q=80&w=1207&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const VeterinariansTab = () => {
  return (
    <div
      className="w-full gap-5"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      }}
    >
      {initialTelemedicineDoctors.map((doctor, index) => (
        <TelemedicineCard key={`${doctor.name}-${index}`} {...doctor} />
      ))}
    </div>
  );
};

export default VeterinariansTab;
