'use client';

import { theme } from '@/lib/theme';
import { VisibleTag } from '@/components/shared/VisibleTag';

const EXPERTISE_SPECIALTIES = [
  'Orthopedics',
  'Dermatology',
  'Cardiology',
  'Neurology',
  'Oncology',
  'Ophthalmology',
];
const PREFERENCES = [
  'Prefers video calls',
  'Available on weekends',
  'Offers follow-up consultations',
  'Provides pet care advice',
  'Accepts multiple pets in one consultation',
  'Offers flexible scheduling',
  'Provides detailed post-consultation reports',
];
const STATE_LICENSES = [
  { name: 'California', number: '#CA-VET-123456' },
  { name: 'California', number: '#CA-VET-123456' },
  { name: 'California', number: '#CA-VET-123456' },
];

const VetsOverViewTab = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* INTRO SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">About</h1>
        <p className="text-justify text-sm" style={{ color: theme.colors.text.secondary }}>
          I believe that every pet deserves the same level of medical care as any human family
          member. My passion for orthopedic surgery comes from seeing the joy in a dog's eyes when
          they can run pain-free again.
        </p>
      </div>
      {/* HIGHLIGHTS SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Expertise & Specialties</h1>
        <div className="flex flex-wrap gap-3">
          {EXPERTISE_SPECIALTIES.map((item, index) => (
            <VisibleTag size="sm" key={index}>
              {item}
            </VisibleTag>
          ))}
        </div>
      </div>
      {/* PREFERENCES */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Preferences</h1>
        <div className="flex flex-wrap gap-3">
          {PREFERENCES.map((item, index) => (
            <VisibleTag size="sm" key={index}>
              {item}
            </VisibleTag>
          ))}
        </div>
      </div>
      {/* STATE LICENSE */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">State Licenses</h1>
        <div className="flex flex-wrap gap-3">
          {STATE_LICENSES.map((item, index) => (
            <div key={index} className="flex w-full justify-between gap-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-sm font-medium" style={{ color: theme.colors.text.tertiary }}>
                {item.number}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VetsOverViewTab;
