'use client';

export default function NotificationSettings() {
  const notificationTypes = [
    {
      title: 'Appointment Reminders',
      description: 'Get notified about upcoming appointments',
      enabled: true,
    },
    {
      title: 'Promotional Emails',
      description: 'Receive special offers and promotions',
      enabled: false,
    },
    {
      title: 'Newsletter',
      description: 'Stay updated with pet care tips and news',
      enabled: true,
    },
    {
      title: 'SMS Notifications',
      description: 'Receive text messages for urgent updates',
      enabled: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600">Choose what notifications you want to receive</p>
      </div>

      <div className="space-y-4">
        {notificationTypes.map((item, index) => (
          <div key={index} className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-base font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  item.enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                aria-label={`Toggle ${item.title}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    item.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
