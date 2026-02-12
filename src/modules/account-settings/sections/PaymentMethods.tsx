'use client';

export default function PaymentMethods() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Payment Methods</h1>
        <p className="text-gray-600">Manage your payment methods for appointments and services</p>
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
                d="M28.8 6.4H3.2C1.44 6.4 0 7.84 0 9.6V22.4C0 24.16 1.44 25.6 3.2 25.6H28.8C30.56 25.6 32 24.16 32 22.4V9.6C32 7.84 30.56 6.4 28.8 6.4ZM28.8 22.4H3.2V16H28.8V22.4ZM28.8 11.2H3.2V9.6H28.8V11.2Z"
                fill="#9CA3AF"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">No payment methods added</h3>
          <p className="mb-6 text-gray-600">
            Add a credit card or other payment method to quickly pay for services
          </p>
          <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}
