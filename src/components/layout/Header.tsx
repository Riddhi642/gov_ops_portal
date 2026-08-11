import { useState } from "react";
import { Bell, User } from "lucide-react";

const Header = () => {

  // 🔔 Notification panel open/close करण्यासाठी
  const [showNotifications, setShowNotifications] = useState(false);

  return (

    <header className="bg-white border-b px-6 py-4">

      {/* Header चा Main Row */}
      <div className="flex items-center justify-between">

        {/* Portal Title */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Government Operations Portal
          </h2>

          <p className="text-sm text-gray-500">
            Operations Dashboard
          </p>
        </div>


        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* 🔔 Notification Section */}
          <div className="relative">

            {/* Bell Icon */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100"
            >
              <Bell size={22} className="text-slate-700" />

              {/* Red Count Badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>


            {/* Notification Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 bg-white border rounded-xl shadow-xl z-50">

                {/* Panel Heading */}
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-slate-800">
                    Notifications
                  </h3>
                </div>

                {/* Notification 1 */}
                <div className="p-4 border-b hover:bg-gray-50">
                  <p className="font-medium text-sm">
                    New Citizen Added
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    A new citizen has been registered.
                  </p>
                </div>

                {/* Notification 2 */}
                <div className="p-4 border-b hover:bg-gray-50">
                  <p className="font-medium text-sm">
                    Project Updated
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Road Development Project completed.
                  </p>
                </div>

                {/* Notification 3 */}
                <div className="p-4 hover:bg-gray-50">
                  <p className="font-medium text-sm">
                    Request Approved
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Birth Certificate request approved.
                  </p>
                </div>

              </div>
            )}
          </div>


          {/* 👤 Admin Profile */}
          <div className="flex items-center gap-2">

            {/* Profile Circle */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <User size={18} />
            </div>

            {/* Name */}
            <div className="hidden md:block">
              <p className="font-medium text-sm">
                Riddhi Khatate
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

           

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;