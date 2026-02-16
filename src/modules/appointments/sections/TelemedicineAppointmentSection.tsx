import { ArrowRightIcon } from '@/assets/icon-components';
import { Button } from '@/components/shared/Button';
import { theme } from '@/lib/theme';
import { SlugProps } from '@/modules/services/sections/HospitalService';

const TelemedicineAppointmentSection = ({ slug }: SlugProps) => {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-[24px] font-semibold">
        Hello World! This is the {slug.name} appointment module.
      </h1>

      <div className="flex items-center justify-between">
        <Button variant="ghost" style={{ color: theme.colors.error }}>
          Cancel
        </Button>
        <Button iconPlacement="end" icon={<ArrowRightIcon />}>
          Continue
        </Button>
      </div>
    </section>
  );
};

export default TelemedicineAppointmentSection;
