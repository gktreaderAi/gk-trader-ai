'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-gray-400">Manage your account preferences, security settings, and notifications.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">Account</h2>
          <div className="mt-4 space-y-4 text-gray-300">
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="mt-1 text-white">user@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Role</p>
              <p className="mt-1 text-white">Trader</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">Security</h2>
          <div className="mt-4 space-y-4 text-gray-300">
            <div>
              <p className="text-sm text-gray-400">Two-factor Authentication</p>
              <p className="mt-1 text-white">Enabled</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Password last updated</p>
              <p className="mt-1 text-white">June 5, 2026</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
