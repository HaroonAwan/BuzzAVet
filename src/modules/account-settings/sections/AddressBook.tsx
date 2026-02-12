'use client';

export default function AddressBook() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Address book</h1>
        <p className="text-gray-600">Manage your saved addresses for deliveries and appointments</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4C11.584 4 8 7.584 8 12C8 17.74 16 28 16 28C16 28 24 17.74 24 12C24 7.584 20.416 4 16 4ZM16 14.8C14.24 14.8 12.8 13.36 12.8 11.6C12.8 9.84 14.24 8.4 16 8.4C17.76 8.4 19.2 9.84 19.2 11.6C19.2 13.36 17.76 14.8 16 14.8Z"
                fill="#9CA3AF"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">No addresses saved yet</h3>
          <p className="mb-6 text-gray-600">
            Add your addresses to make booking appointments easier
          </p>
          <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}
