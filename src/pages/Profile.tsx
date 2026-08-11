import { useState } from "react";

const Profile = () => {

  // Profile form states
  const [name, setName] = useState("Riddhi Khatate");
  const [email, setEmail] = useState("riddhi@example.com");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("Operations");

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your personal and professional information.
        </p>
      </div>


      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            RK
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {name}
            </h2>

            <p className="text-gray-500">
              Government Operations
            </p>
          </div>

        </div>
                {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Department
            </label>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Operations">
                Operations
              </option>

              <option value="Revenue">
                Revenue
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Transport">
                Transport
              </option>
            </select>
          </div>

        </div>


        {/* Save Button */}
        <div className="mt-6">

          <button
            type="button"
            onClick={() => alert("Profile Updated Successfully!")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;