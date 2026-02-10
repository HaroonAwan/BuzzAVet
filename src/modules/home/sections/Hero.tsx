import { LocationInput } from '@/components/shared/navbar/LocationInput';
import { ServiceCategories } from '@/components/shared/navbar/ServiceCategories';
import { ServiceTypeInput } from '@/components/shared/navbar/ServiceTypeInput';
import { useNavbar } from '@/components/shared/navbar/useNavbar';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { SearchIcon, StarIcon } from '@/assets/icon-components';
import LicenseIcon from '@/assets/images/home/license.svg';
import ClockIcon from '@/assets/images/home/clock.svg';
import Image from 'next/image';
import CatImage from '@/assets/images/home/cat.png';
import DogImage from '@/assets/images/home/dog.png';

const Hero = () => {
  const {
    selectedCategory,
    locationValue,
    serviceTypeValue,
    showLocationDropdown,
    showServiceTypeDropdown,
    isServiceTypeFocused,
    recentSearches,
    recentServiceSearches,
    locationInputRef,
    locationDropdownRef,
    serviceTypeInputRef,
    serviceTypeDropdownRef,
    handleLocationFocus,
    handleLocationClick,
    handleLocationSelect,
    handleClearLocation,
    handleClearRecentSearches,
    handleClearRecentServiceSearches,
    handleNearbyClick,
    handleServiceTypeFocus,
    handleServiceTypeClick,
    handleServiceTypeSelect,
    handleCategorySelect,
    setLocationValue,
    setServiceTypeValue,
  } = useNavbar();
  return (
    <div className="h-167 hero-banner-image ">
      <div className="flex items-center justify-center container h-full z-10 relative">
        <div className="flex flex-col items-center justify-center gap-10 h-full max-w-208.25">
          {/* title and tag line */}
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <h1 className="forty-eight font-semibold leading-tight text-center text-white flex flex-col">
              <span>Comprehensive Vet</span>
              <span className="flex items-center gap-2">
                Care.
                <span
                  className="pacifico font-normal"
                  style={{ color: theme.colors.special.verifiedBadge }}
                >
                  Where
                </span>
                and
                <span
                  className="pacifico font-normal"
                  style={{ color: theme.colors.special.verifiedBadge }}
                >
                  When
                </span>
                you need it
              </span>
            </h1>
            <p className="font-medium text-white">
              Buzz a vet helps you explore externships, sharpen your interview skills, and connect
              with top veterinary practices all in one supportive space.
            </p>
          </div>
          {/* Search Section */}
          <div className="SHADOW bg-white rounded-2xl flex flex-col w-full">
            <ServiceCategories
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
            <div className="p-3">
              <div
                className={cn(
                  'flex items-center gap-0 rounded-xl border bg-white',
                  'transition-all duration-300 h-12'
                )}
                style={{
                  borderColor:
                    showLocationDropdown || showServiceTypeDropdown
                      ? theme.colors.active
                      : theme.colors.border.default,
                }}
              >
                <LocationInput
                  value={locationValue}
                  onChange={setLocationValue}
                  onFocus={handleLocationFocus}
                  onClick={handleLocationClick}
                  onSelect={handleLocationSelect}
                  onClear={handleClearLocation}
                  onNearbyClick={handleNearbyClick}
                  showDropdown={showLocationDropdown}
                  recentSearches={recentSearches}
                  onClearRecentSearches={handleClearRecentSearches}
                  inputRef={locationInputRef}
                  dropdownRef={locationDropdownRef}
                  isExpanded={true}
                  isRightActive={showServiceTypeDropdown}
                />

                <ServiceTypeInput
                  value={serviceTypeValue}
                  onChange={setServiceTypeValue}
                  onFocus={handleServiceTypeFocus}
                  onClick={handleServiceTypeClick}
                  onSelect={handleServiceTypeSelect}
                  showDropdown={showServiceTypeDropdown}
                  recentServiceSearches={recentServiceSearches}
                  onClearRecentServiceSearches={handleClearRecentServiceSearches}
                  inputRef={serviceTypeInputRef}
                  dropdownRef={serviceTypeDropdownRef}
                  isServiceTypeFocused={isServiceTypeFocused}
                  isSearchExpanded={true}
                  isExpanded={true}
                />

                <button
                  className="flex cursor-pointer h-full items-center justify-center transition-opacity hover:opacity-90 shrink-0 w-12 rounded-xl"
                  style={{ backgroundColor: theme.colors.special.verifiedBadge }}
                  aria-label="Search"
                >
                  <SearchIcon size={20} fill={theme.colors.text.default} />
                </button>
              </div>
            </div>
          </div>
          {/* Why choose us section */}
          <div className="flex items-center  justify-center gap-10">
            <div className="flex items-center justify-center gap-2">
              <Image src={LicenseIcon} alt="License" width={24} height={24} />
              <p className="font-medium text-white">Licensed Vets</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={ClockIcon}
                alt="License"
                width={24}
                height={24}
                className="white-filter"
              />
              <p className="font-medium text-white">24/7 Available</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <StarIcon size={24} fill={'#FFFFFF'} />
              <p className="font-medium text-white">4.9/5 Rating</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-175 w-full mx-auto relative">
        <Image
          src={CatImage}
          alt="Cat"
          width={378}
          height={450}
          className="absolute -bottom-15 right-full z-0"
        />
        <Image
          src={DogImage}
          alt="Dog"
          width={538}
          height={434}
          className="absolute bottom-10 left-full z-0"
        />
      </div>
    </div>
  );
};

export default Hero;
