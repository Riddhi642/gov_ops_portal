import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Users,
  Building2,
  UserPlus,
  X,
  Eye,
} from "lucide-react";

type CitizenData = {
  id: number;
  citizenId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
};

const Citizen = () => {
  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // CITIZENS
  // =========================

  const [citizens, setCitizens] = useState<CitizenData[]>([]);

  // =========================
  // EDIT
  // =========================

  const [editId, setEditId] = useState<number | null>(null);

  // =========================
  // VIEW MODAL
  // =========================

  const [selectedCitizen, setSelectedCitizen] =
    useState<CitizenData | null>(null);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setEditId(null);
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // =========================
    // VALIDATION
    // =========================

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !department
    ) {
      alert("Please fill all fields");
      return;
    }

    const isEditing = editId !== null;

    // =========================
    // FIND EXISTING CITIZEN
    // =========================

    const existingCitizen = isEditing
      ? citizens.find((citizen) => citizen.id === editId)
      : undefined;

    // =========================
    // GENERATE CITIZEN ID
    // =========================

    const citizenId = isEditing
      ? existingCitizen?.citizenId ?? ""
      : `CIT-${String(citizens.length + 1).padStart(3, "0")}`;

    // =========================
    // GENERATE NUMERIC ID
    // =========================
    // Editing असल्यास जुना ID ठेवतो.
    // New citizen असल्यास existing IDs मधून next ID घेतो.

    const newNumericId = isEditing
      ? editId
      : citizens.length > 0
      ? Math.max(...citizens.map((citizen) => citizen.id)) + 1
      : 1;

    // =========================
    // NEW CITIZEN OBJECT
    // =========================

    const newCitizen: CitizenData = {
      id: newNumericId as number,
      citizenId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      department,
    };

    // =========================
    // UPDATE CITIZEN
    // =========================

    if (isEditing) {
      setCitizens((prev) =>
        prev.map((citizen) =>
          citizen.id === editId ? newCitizen : citizen
        )
      );

      alert("Citizen Updated Successfully!");
    }

    // =========================
    // ADD CITIZEN
    // =========================

    else {
      setCitizens((prev) => [...prev, newCitizen]);

      alert(`Citizen Added Successfully! ID: ${citizenId}`);
    }

    // =========================
    // RESET FORM
    // =========================

    resetForm();
  };

  // =========================
  // SEARCH CITIZENS
  // =========================

  const filteredCitizens = citizens.filter((citizen) => {
    const searchText = search.toLowerCase().trim();

    return (
      citizen.citizenId.toLowerCase().includes(searchText) ||
      citizen.name.toLowerCase().includes(searchText) ||
      citizen.email.toLowerCase().includes(searchText) ||
      citizen.phone.toLowerCase().includes(searchText) ||
      citizen.department.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // VIEW CITIZEN
  // =========================

  const viewCitizen = (id: number) => {
    const citizen = citizens.find((item) => item.id === id);

    if (!citizen) return;

    setSelectedCitizen(citizen);
  };

  // =========================
  // EDIT CITIZEN
  // =========================

  const editCitizen = (id: number) => {
    const citizen = citizens.find((item) => item.id === id);

    if (!citizen) return;

    setName(citizen.name);
    setEmail(citizen.email);
    setPhone(citizen.phone);
    setDepartment(citizen.department);
    setEditId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE CITIZEN
  // =========================

  const deleteCitizen = (id: number) => {
    const citizen = citizens.find((item) => item.id === id);

    if (!citizen) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${citizen.name}?`
    );

    if (!confirmed) return;

    setCitizens((prev) =>
      prev.filter((item) => item.id !== id)
    );

    // Deleted citizen edit होत असेल
    if (editId === id) {
      resetForm();
    }

    // Deleted citizen modal मध्ये असेल
    if (selectedCitizen?.id === id) {
      setSelectedCitizen(null);
    }
  };

  // =========================
  // KPI CALCULATIONS
  // =========================

  const totalCitizens = citizens.length;

  const totalDepartments = new Set(
    citizens.map((citizen) => citizen.department)
  ).size;

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-6 w-full">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Citizen Management
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage registered citizens and their information.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg w-fit">
          <Users size={19} />

          <span className="font-semibold text-sm">
            {totalCitizens} Citizens
          </span>
        </div>

      </div>

      {/* =====================================
          KPI CARDS
      ===================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Total Citizens */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Citizens
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {totalCitizens}
              </h2>
            </div>

            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Users size={23} />
            </div>

          </div>

        </div>

        {/* Departments */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Departments
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {totalDepartments}
              </h2>
            </div>

            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <Building2 size={23} />
            </div>

          </div>

        </div>

        {/* Registered */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Registered
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {citizens.length}
              </h2>
            </div>

            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <UserPlus size={23} />
            </div>

          </div>

        </div>

      </div>

      {/* =====================================
          ADD / EDIT CITIZEN
      ===================================== */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
              {editId !== null
                ? "Edit Citizen"
                : "Add New Citizen"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {editId !== null
                ? "Update citizen information."
                : "Register a new citizen."}
            </p>

          </div>

          {/* Cancel Edit */}

          {editId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
            >
              <X size={17} />
              Cancel Edit
            </button>
          )}

        </div>

        {/* =====================================
            FORM
        ===================================== */}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter citizen name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="citizen@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Department */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1">
                Department
              </label>

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >

                <option value="">
                  Select Department
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

                <option value="Police">
                  Police
                </option>

                <option value="Municipal">
                  Municipal
                </option>

                <option value="Water Supply">
                  Water Supply
                </option>

                <option value="Electricity">
                  Electricity
                </option>

              </select>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-3 mt-5">

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >

              {editId !== null ? (
                <>
                  <Pencil size={18} />
                  Update Citizen
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Save Citizen
                </>
              )}

            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Clear
              </button>
            )}

          </div>

        </form>

      </div>

      {/* =====================================
          CITIZENS LIST
      ===================================== */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

          <div>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
              Citizens List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Search and manage registered citizens.
            </p>

          </div>

          {/* Search */}

          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search citizens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {filteredCitizens.length === 0 ? (

          <div className="py-10 text-center">

            <Users
              size={42}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-slate-700">
              No Citizens Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {search
                ? "No citizens match your search."
                : "Add a new citizen to see them here."}
            </p>

          </div>

        ) : (

          /* =====================================
             TABLE
          ===================================== */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="bg-slate-50">

                  <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                    Citizen ID
                  </th>

                  <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                    Name
                  </th>

                  <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                    Email
                  </th>

                  <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                    Phone
                  </th>

                  <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                    Department
                  </th>

                  <th className="text-center p-3 text-sm font-semibold text-slate-700 border-b">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCitizens.map((citizen) => (

                  <tr
                    key={citizen.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Citizen ID */}

                    <td className="p-3 border-b">

                      <span className="inline-block bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-sm font-medium">
                        {citizen.citizenId}
                      </span>

                    </td>

                    {/* Name */}

                    <td className="p-3 border-b font-medium text-slate-800">
                      {citizen.name}
                    </td>

                    {/* Email */}

                    <td className="p-3 border-b text-sm text-gray-600">
                      {citizen.email}
                    </td>

                    {/* Phone */}

                    <td className="p-3 border-b text-sm text-gray-600">
                      {citizen.phone}
                    </td>

                    {/* Department */}

                    <td className="p-3 border-b">

                      <span className="inline-block bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-sm">
                        {citizen.department}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="p-3 border-b">

                      <div className="flex items-center justify-center gap-2">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => viewCitizen(citizen.id)}
                          title="View Citizen"
                          aria-label="View Citizen"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Eye size={17} />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() => editCitizen(citizen.id)}
                          title="Edit Citizen"
                          aria-label="Edit Citizen"
                          className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
                        >
                          <Pencil size={17} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() => deleteCitizen(citizen.id)}
                          title="Delete Citizen"
                          aria-label="Delete Citizen"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =====================================
          VIEW CITIZEN MODAL
      ===================================== */}

      {selectedCitizen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

            {/* Modal Header */}

            <div className="flex items-center justify-between p-5 border-b">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Citizen Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Complete citizen information
                </p>

              </div>

              <button
                type="button"
                onClick={() => setSelectedCitizen(null)}
                title="Close"
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}

            <div className="p-5 space-y-4">

              {/* Citizen ID */}

              <div className="bg-blue-50 rounded-lg p-4">

                <p className="text-xs text-gray-500">
                  Citizen ID
                </p>

                <p className="text-lg font-bold text-blue-700 mt-1">
                  {selectedCitizen.citizenId}
                </p>

              </div>

              {/* Name */}

              <div>

                <p className="text-xs text-gray-400">
                  Full Name
                </p>

                <p className="font-medium text-slate-800 mt-1">
                  {selectedCitizen.name}
                </p>

              </div>

              {/* Email */}

              <div>

                <p className="text-xs text-gray-400">
                  Email Address
                </p>

                <p className="font-medium text-slate-800 mt-1 break-all">
                  {selectedCitizen.email}
                </p>

              </div>

              {/* Phone */}

              <div>

                <p className="text-xs text-gray-400">
                  Phone Number
                </p>

                <p className="font-medium text-slate-800 mt-1">
                  {selectedCitizen.phone}
                </p>

              </div>

              {/* Department */}

              <div>

                <p className="text-xs text-gray-400">
                  Department
                </p>

                <span className="inline-block bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium mt-1">
                  {selectedCitizen.department}
                </span>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="flex justify-end p-5 border-t">

              <button
                type="button"
                onClick={() => setSelectedCitizen(null)}
                className="bg-slate-800 text-white px-5 py-2.5 rounded-lg hover:bg-slate-900 transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Citizen;