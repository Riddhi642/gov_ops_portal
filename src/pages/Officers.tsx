import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  UserPlus,
  Users,
  Building2,
  X,
} from "lucide-react";

type OfficerData = {
  id: number;
  officerId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
};

const Officers = () => {
  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  // =========================
  // SEARCH STATE
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // OFFICERS LIST
  // =========================

  const [officers, setOfficers] = useState<OfficerData[]>([]);

  // =========================
  // EDIT STATE
  // =========================

  const [editId, setEditId] = useState<number | null>(null);

  // =========================
  // GENERATE OFFICER ID
  // =========================

  const generateOfficerId = () => {
    if (officers.length === 0) {
      return "OFF-001";
    }

    const numbers = officers.map(
      (officer) =>
        parseInt(officer.officerId.replace("OFF-", ""), 10) || 0
    );

    const maxNumber = Math.max(...numbers);

    return `OFF-${String(maxNumber + 1).padStart(3, "0")}`;
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setDesignation("");
    setEditId(null);
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !department ||
      !designation
    ) {
      alert("Please fill all fields");
      return;
    }

    // =========================
    // UPDATE EXISTING OFFICER
    // =========================

    if (editId !== null) {
      const existingOfficer = officers.find(
        (officer) => officer.id === editId
      );

      if (!existingOfficer) {
        alert("Officer not found");
        return;
      }

      const updatedOfficer: OfficerData = {
        id: existingOfficer.id,
        officerId: existingOfficer.officerId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        department,
        designation,
      };

      setOfficers((prev) =>
        prev.map((officer) =>
          officer.id === editId ? updatedOfficer : officer
        )
      );

      alert("Officer Updated Successfully!");

      resetForm();
      return;
    }

    // =========================
    // ADD NEW OFFICER
    // =========================

    const newOfficerId = generateOfficerId();

    const newOfficer: OfficerData = {
      id: Date.now(),
      officerId: newOfficerId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      department,
      designation,
    };

    setOfficers((prev) => [...prev, newOfficer]);

    alert(`Officer Added Successfully! ID: ${newOfficerId}`);

    resetForm();
  };

  // =========================
  // SEARCH OFFICERS
  // =========================

  const filteredOfficers = officers.filter((officer) => {
    const searchText = search.toLowerCase().trim();

    return (
      officer.name.toLowerCase().includes(searchText) ||
      officer.email.toLowerCase().includes(searchText) ||
      officer.phone.toLowerCase().includes(searchText) ||
      officer.department.toLowerCase().includes(searchText) ||
      officer.designation.toLowerCase().includes(searchText) ||
      officer.officerId.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // EDIT OFFICER
  // =========================

  const editOfficer = (id: number) => {
    const officer = officers.find((item) => item.id === id);

    if (!officer) return;

    setName(officer.name);
    setEmail(officer.email);
    setPhone(officer.phone);
    setDepartment(officer.department);
    setDesignation(officer.designation);

    setEditId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE OFFICER
  // =========================

  const deleteOfficer = (id: number) => {
    const officer = officers.find((item) => item.id === id);

    if (!officer) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${officer.name}?`
    );

    if (!confirmDelete) return;

    setOfficers((prev) =>
      prev.filter((item) => item.id !== id)
    );

    // जर deleted officer edit होत असेल
    if (editId === id) {
      resetForm();
    }
  };

  // =========================
  // KPI CALCULATIONS
  // =========================

  const totalOfficers = officers.length;

  const totalDepartments = new Set(
    officers.map((officer) => officer.department)
  ).size;

  const totalDesignations = new Set(
    officers.map((officer) => officer.designation)
  ).size;

  // =========================
  // RETURN
  // =========================

  return (
    <div className="space-y-6 w-full">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Officer Management
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage government officers and their details.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg w-fit">
          <Users size={19} />

          <span className="font-semibold text-sm">
            {totalOfficers} Officers
          </span>
        </div>

      </div>

      {/* =========================================
          KPI CARDS
      ========================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Total Officers */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Officers
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {totalOfficers}
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

        {/* Designations */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Designations
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {totalDesignations}
              </h2>
            </div>

            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <UserPlus size={23} />
            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          ADD / EDIT OFFICER
      ========================================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
              {editId !== null
                ? "Edit Officer"
                : "Add New Officer"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {editId !== null
                ? "Update officer information."
                : "Register a new government officer."}
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

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Officer Name
              </label>

              <input
                type="text"
                placeholder="Enter officer name"
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
                placeholder="officer@example.com"
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
              </select>
            </div>

            {/* Designation */}

            <div className="md:col-span-2">

              <label className="block text-sm font-medium text-slate-700 mb-1">
                Designation
              </label>

              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">
                  Select Designation
                </option>

                <option value="Collector">
                  Collector
                </option>

                <option value="Tehsildar">
                  Tehsildar
                </option>

                <option value="Revenue Officer">
                  Revenue Officer
                </option>

                <option value="Health Officer">
                  Health Officer
                </option>

                <option value="Education Officer">
                  Education Officer
                </option>

                <option value="Transport Officer">
                  Transport Officer
                </option>

                <option value="Police Inspector">
                  Police Inspector
                </option>

                <option value="Municipal Officer">
                  Municipal Officer
                </option>
              </select>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-3 mt-5">

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {editId !== null ? (
                <>
                  <Pencil size={18} />
                  Update Officer
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Save Officer
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

      {/* =========================================
          OFFICERS LIST
      ========================================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
              Officers List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Search and manage registered officers.
            </p>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search officers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

        </div>

        {/* EMPTY STATE */}

        {filteredOfficers.length === 0 ? (

          <div className="py-10 text-center">

            <Users
              size={42}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-slate-700">
              No Officers Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {search
                ? "No officers match your search."
                : "Add a new officer to see them here."}
            </p>

          </div>

        ) : (

          <>
            {/* =====================================
                DESKTOP TABLE
            ===================================== */}

            <div className="hidden md:block w-full overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>
                  <tr className="bg-slate-50">

                    <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                      Officer ID
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

                    <th className="text-left p-3 text-sm font-semibold text-slate-700 border-b">
                      Designation
                    </th>

                    <th className="text-center p-3 text-sm font-semibold text-slate-700 border-b">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredOfficers.map((officer) => (

                    <tr
                      key={officer.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <td className="p-3 border-b">
                        <span className="inline-block bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-sm font-medium">
                          {officer.officerId}
                        </span>
                      </td>

                      <td className="p-3 border-b font-medium text-slate-800">
                        {officer.name}
                      </td>

                      <td className="p-3 border-b text-sm text-gray-600">
                        {officer.email}
                      </td>

                      <td className="p-3 border-b text-sm text-gray-600">
                        {officer.phone}
                      </td>

                      <td className="p-3 border-b">

                        <span className="inline-block bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-sm">
                          {officer.department}
                        </span>

                      </td>

                      <td className="p-3 border-b text-sm text-slate-700">
                        {officer.designation}
                      </td>

                      <td className="p-3 border-b">

                        <div className="flex items-center justify-center gap-2">

                          <button
                            type="button"
                            onClick={() => editOfficer(officer.id)}
                            title="Edit Officer"
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteOfficer(officer.id)}
                            title="Delete Officer"
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

            {/* =====================================
                MOBILE CARDS
            ===================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">

              {filteredOfficers.map((officer) => (

                <div
                  key={officer.id}
                  className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
                >

                  {/* CARD HEADER */}

                  <div className="min-w-0">

                    <span className="inline-block bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold mb-2">
                      {officer.officerId}
                    </span>

                    <h3 className="font-semibold text-slate-800 text-base break-words">
                      {officer.name}
                    </h3>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-4 space-y-2.5">

                    <div className="flex flex-col">

                      <span className="text-xs text-gray-400">
                        Email
                      </span>

                      <span className="text-sm text-gray-700 break-all">
                        {officer.email}
                      </span>

                    </div>

                    <div className="flex flex-col">

                      <span className="text-xs text-gray-400">
                        Phone
                      </span>

                      <span className="text-sm text-gray-700">
                        {officer.phone}
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-2">

                      <div className="min-w-0">

                        <span className="text-xs text-gray-400 block">
                          Department
                        </span>

                        <span className="inline-block bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs mt-1">
                          {officer.department}
                        </span>

                      </div>

                      <div className="min-w-0 text-right">

                        <span className="text-xs text-gray-400 block">
                          Designation
                        </span>

                        <span className="text-xs text-slate-700 font-medium break-words">
                          {officer.designation}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* MOBILE ACTIONS */}

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t">

                    <button
                      type="button"
                      onClick={() => editOfficer(officer.id)}
                      className="flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 py-2.5 rounded-lg text-sm font-medium hover:bg-yellow-100 transition"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteOfficer(officer.id)}
                      className="flex items-center justify-center gap-2 bg-red-50 text-red-700 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default Officers;