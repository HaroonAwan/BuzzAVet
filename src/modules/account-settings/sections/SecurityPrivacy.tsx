'use client';

export default function SecurityPrivacy() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Security & Privacy</h1>
        <p className="text-gray-600">Manage your account security and privacy settings</p>
      </div>

      {/* Password Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-base font-medium text-gray-900">Password</h3>
            <p className="text-sm text-gray-600">Last changed 3 months ago</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
            Change Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-base font-medium text-gray-900">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Enable
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-base font-medium text-gray-900">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium text-gray-900">Profile Visibility</p>
              <p className="text-sm text-gray-600">Control who can see your profile</p>
            </div>
            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Everyone</option>
              <option>Only Me</option>
              <option>Vets Only</option>
            </select>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium text-gray-900">Activity Status</p>
              <p className="text-sm text-gray-600">Show when you're active</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-base font-medium text-red-900">Delete Account</h3>
            <p className="text-sm text-red-700">Permanently delete your account and all data</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
