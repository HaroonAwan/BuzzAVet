import { Button } from '@/components/shared/Button';
import AddressBookIcon from '@/assets/images/settings/address-book.svg';
import Image from 'next/image';

const NoAddress = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Image src={AddressBookIcon} alt="Address Book Icon" width={32} height={32} />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">No addresses saved yet</h3>
        <p className="mb-6 text-gray-600">Add your addresses to make booking appointments easier</p>
        <Button variant="outline">Add New Address</Button>
      </div>
    </div>
  );
};

export default NoAddress;
