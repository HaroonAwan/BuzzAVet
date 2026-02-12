import AddressCard from '../layouts/AddressCard';
import NoAddress from '../layouts/NoAddress';

const DUMMY_ADDRESS = [
  {
    id: '1',
    label: 'Home',
    address: '123 Main St, Springfield, IL 62704',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    address: '456 Elm St, Springfield, IL 62701',
    isDefault: false,
  },
  {
    id: '3',
    label: 'Parents',
    address: '789 Oak St, Springfield, IL 62703',
    isDefault: false,
  },
];
export type Address = (typeof DUMMY_ADDRESS)[number];
export default function AddressBook() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-1.5 text-2xl font-semibold text-gray-900">Address book</h1>
        <p className="text-gray-600">
          Manage your saved addresses for home and emergency contacts.
        </p>
      </div>
      {DUMMY_ADDRESS.length > 0 ? (
        <div className="space-y-4">
          {DUMMY_ADDRESS.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      ) : (
        <NoAddress />
      )}
    </div>
  );
}
