import { Address } from '../sections/AddressBook';
import Image from 'next/image';
import HomeIcon from '@/assets/images/settings/home.svg';
import OfficeIcon from '@/assets/images/settings/office.svg';
import ParentsIcon from '@/assets/images/settings/address-book.svg';
import MenuDotsIcon from '@/assets/images/shared/threeDots.svg';
import { theme } from '@/lib/theme';
import { StarIcon } from '@/assets/icon-components';
import { Button } from '@/components/shared/Button';
import { SettingsAddressBookMenuPopover } from '@/components/shared/popover/menu/SettingsAddressBookMenuPopover';
import { useAddressBook } from '../hooks/useAddressBook';

const AddressCard = ({ address }: { address: Address }) => {
  const { isPopoverOpen, setIsPopoverOpen, handleEdit, handleSetAsDefault, handleDelete } =
    useAddressBook();
  const getIcon = () => {
    switch (address.label.toLowerCase()) {
      case 'home':
        return HomeIcon;
      case 'work':
        return OfficeIcon;
      case 'parents':
        return ParentsIcon;
      default:
        return HomeIcon;
    }
  };
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Image src={getIcon()} alt={address.label} width={16} height={16} />
            <h3 className="text-sm font-medium">{address.label}</h3>
            {address.isDefault && (
              <span
                style={{
                  backgroundColor: theme.colors.background.tertiary,
                  color: theme.colors.text.secondary,
                }}
                className="flex items-center gap-1 rounded-sm px-2 py-1 text-sm font-medium"
              >
                <StarIcon size={12} fill={theme.colors.text.tertiary} />
                Default
              </span>
            )}
          </div>
          <p className="text-gray-600">{address.address}</p>
        </div>
        {/* RIGHT SECTION */}
        <SettingsAddressBookMenuPopover
          isOpen={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          onEdit={() => handleEdit(address.id)}
          onSetAsDefault={() => handleSetAsDefault(address.id)}
          onDelete={() => handleDelete(address.id)}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              icon={<Image src={MenuDotsIcon} alt="Menu" width={16} height={16} />}
              iconPlacement="center"
              className="p-0"
            />
          }
        />
      </div>
    </div>
  );
};

export default AddressCard;
