import { useState } from "react";

const Settings = () => {

  // Settings States
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [requestAlerts, setRequestAlerts] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your application preferences and notifications.
        </p>
      </div>


      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-semibold text-slate-800 mb-5">
          Notification Settings
        </h2>


        {/* Email Notifications */}
        <div className="flex items-center justify-between border-b py-4">

          <div>
            <h3 className="font-medium text-slate-800">
              Email Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Receive important updates through email.
            </p>
          </div>

          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) =>
              setEmailNotifications(e.target.checked)
            }
            className="w-5 h-5"
          />

        </div>


        {/* Request Alerts */}
        <div className="flex items-center justify-between border-b py-4">

          <div>
            <h3 className="font-medium text-slate-800">
              Request Alerts
            </h3>

            <p className="text-sm text-gray-500">
              Get alerts when a citizen request is updated.
            </p>
          </div>

          <input
            type="checkbox"
            checked={requestAlerts}
            onChange={(e) =>
              setRequestAlerts(e.target.checked)
            }
            className="w-5 h-5"
          />

        </div>
                {/* Appearance Settings */}
        <div className="flex items-center justify-between border-b py-4">

          <div>
            <h3 className="font-medium text-slate-800">
              Compact Mode
            </h3>

            <p className="text-sm text-gray-500">
              Use a more compact layout for dashboard content.
            </p>
          </div>

          <input
            type="checkbox"
            checked={compactMode}
            onChange={(e) =>
              setCompactMode(e.target.checked)
            }
            className="w-5 h-5"
          />

        </div>


        {/* Save Settings */}
        <div className="mt-6">

          <button
            type="button"
            onClick={() =>
              alert("Settings Saved Successfully!")
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Settings
          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;