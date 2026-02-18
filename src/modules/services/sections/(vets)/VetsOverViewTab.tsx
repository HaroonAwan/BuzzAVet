'use client';

import { theme } from '@/lib/theme';
import { VisibleTag } from '@/components/shared/VisibleTag';

interface VetsOverViewTabProps {
  vet: any;
  mappedData: any;
}

const VetsOverViewTab = ({ vet, mappedData }: VetsOverViewTabProps) => {
  const profile = vet?.profile || {};
  const about = profile?.personalInformation?.aboutMe || '';
  const specialties = profile?.areaOfExpertise?.typesOfAnimals || [];
  const preferences = Object.entries(profile?.preferences || {})
    .filter(([_, v]) => v)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()));
  const licenses = (profile?.licenses || []).map((lic: any) => ({
    name: lic.state || '',
    number: lic.number || '',
  }));

  return (
    <div className="flex w-full flex-col gap-10">
      {/* INTRO SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">About</h1>
        <p className="text-justify text-sm" style={{ color: theme.colors.text.secondary }}>
          {about || 'No about info available.'}
        </p>
      </div>
      {/* HIGHLIGHTS SECTION */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Expertise & Specialties</h1>
        <div className="flex flex-wrap gap-3">
          {specialties.length > 0 ? (
            specialties.map((item: string, index: number) => (
              <VisibleTag size="sm" key={index}>
                {item}
              </VisibleTag>
            ))
          ) : (
            <span className="text-sm">No specialties listed.</span>
          )}
        </div>
      </div>
      {/* PREFERENCES */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">Preferences</h1>
        <div className="flex flex-wrap gap-3">
          {preferences.length > 0 ? (
            preferences.map((item: string, index: number) => (
              <VisibleTag size="sm" key={index}>
                {item}
              </VisibleTag>
            ))
          ) : (
            <span className="text-sm">No preferences listed.</span>
          )}
        </div>
      </div>
      {/* STATE LICENSE */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-semibold">State Licenses</h1>
        <div className="flex flex-wrap gap-3">
          {licenses.length > 0 ? (
            licenses.map((item: any, index: number) => (
              <div key={index} className="flex w-full justify-between gap-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm font-medium" style={{ color: theme.colors.text.tertiary }}>
                  {item.number}
                </p>
              </div>
            ))
          ) : (
            <span className="text-sm">No licenses listed.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetsOverViewTab;
