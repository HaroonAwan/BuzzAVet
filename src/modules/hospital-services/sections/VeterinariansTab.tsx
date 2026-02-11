import { TelemedicineCard } from '@/modules/home/layouts/TelemedicineCard';
import { initialTelemedicineDoctors } from '@/modules/home/sections/TopRatedTelemedicineSection';

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
