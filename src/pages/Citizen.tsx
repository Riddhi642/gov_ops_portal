import { useState } from "react";

// प्रत्येक Citizen चा Data Type
type CitizenData = {
  // प्रत्येक Citizen साठी unique ID
  id: number;

  // Citizen ID automatically generate होईल
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
  // SEARCH STATE
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // CITIZENS LIST
  // =========================

  const [citizens, setCitizens] = useState<CitizenData[]>([]);

  // =========================
  // EDIT STATE
  // =========================

  const [editId, setEditId] = useState<number | null>(null);
    // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (e: React.FormEvent) => {
    // Page refresh होऊ नये म्हणून
    e.preventDefault();

    // सर्व fields भरले आहेत का ते check करतो
    if (!name || !email || !phone || !department) {
      alert("Please fill all fields");
      return;
    }

    // Citizen ID generate करतो
    // Edit असेल तर जुनी ID ठेवतो
    let generatedCitizenId = "";

    if (editId !== null) {
      const existingCitizen = citizens.find(
        (citizen) => citizen.id === editId
      );

      generatedCitizenId =
        existingCitizen?.citizenId || "";
    } else {
      // New Citizen साठी automatic ID
      generatedCitizenId =
        `CIT-${String(citizens.length + 1).padStart(3, "0")}`;
    }

    // नवीन / Updated Citizen Object
    const newCitizen: CitizenData = {
      id: editId ?? Date.now(),

      citizenId: generatedCitizenId,

      name,
      email,
      phone,
      department,
    };

    // =========================
    // EDIT CITIZEN
    // =========================

    if (editId !== null) {

      const updatedCitizens = citizens.map(
        (citizen) =>
          citizen.id === editId
            ? newCitizen
            : citizen
      );

      // Updated list State मध्ये save करतो
      setCitizens(updatedCitizens);

      // Edit Mode बंद करतो
      setEditId(null);

      alert("Citizen Updated Successfully!");

    } else {

      // =========================
      // NEW CITIZEN ADD
      // =========================

      const updatedCitizens = [
        ...citizens,
        newCitizen,
      ];

      // नवीन Citizen List मध्ये add करतो
      setCitizens(updatedCitizens);

      alert(
        `Citizen Added Successfully! ID: ${generatedCitizenId}`
      );
    }

    // =========================
    // FORM RESET
    // =========================

    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
  };
    // =========================
  // SEARCH CITIZENS
  // =========================

  const filteredCitizens = citizens.filter(
    (citizen) =>
      citizen.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      citizen.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      citizen.phone
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      citizen.department
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      citizen.citizenId
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  // =========================
  // EDIT CITIZEN
  // =========================

  const editCitizen = (id: number) => {

    // Selected Citizen शोधतो
    const citizen = citizens.find(
      (item) => item.id === id
    );

    // Citizen सापडला नाही तर function थांबवतो
    if (!citizen) return;

    // Existing data form मध्ये भरतो
    setName(citizen.name);
    setEmail(citizen.email);
    setPhone(citizen.phone);
    setDepartment(citizen.department);

    // Edit Mode सुरू करतो
    setEditId(id);
  };


  // =========================
  // DELETE CITIZEN
  // =========================

  const deleteCitizen = (id: number) => {

    // Selected Citizen remove करतो
    const updatedCitizens = citizens.filter(
      (citizen) => citizen.id !== id
    );

    // Updated list State मध्ये save करतो
    setCitizens(updatedCitizens);
  };
    return (
    <div className="p-6">

      {/* =========================================
          CITIZEN FORM CARD
      ========================================= */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">
          Citizen Management
        </h1>


        {/* Citizen Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* =========================
              NAME
          ========================= */}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />


          {/* =========================
              EMAIL
          ========================= */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />


          {/* =========================
              PHONE
          ========================= */}

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />


          {/* =========================
              DEPARTMENT
          ========================= */}

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="w-full border rounded-lg p-3"
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


          {/* =========================
              SAVE / UPDATE BUTTON
          ========================= */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {editId !== null
              ? "Update Citizen"
              : "Save Citizen"}
          </button>

        </form>

      </div>
            {/* =========================================
          CITIZENS LIST CARD
      ========================================= */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        {/* Table Title */}
        <h2 className="text-2xl font-bold mb-4">
          Citizens List
        </h2>


        {/* =========================
            SEARCH BOX
        ========================= */}

        <input
          type="text"
          placeholder="Search Citizen..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-5"
        />


        {/* =========================
            RESPONSIVE TABLE
        ========================= */}

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            {/* TABLE HEADER */}

            <thead>

              <tr className="bg-slate-100">

                <th className="border p-3">
                  Citizen ID
                </th>

                <th className="border p-3">
                  Name
                </th>

                <th className="border p-3">
                  Email
                </th>

                <th className="border p-3">
                  Phone
                </th>

                <th className="border p-3">
                  Department
                </th>

                <th className="border p-3">
                  Action
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}

            <tbody>

              {/* Citizen Data नसेल तर */}
              {filteredCitizens.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center p-5 text-gray-500"
                  >
                    No Citizens Added
                  </td>

                </tr>

              ) : (

                filteredCitizens.map((citizen) => (

                  <tr key={citizen.id}>

                    {/* Citizen ID */}

                    <td className="border p-3 font-medium text-blue-600">
                      {citizen.citizenId}
                    </td>


                    {/* Name */}

                    <td className="border p-3">
                      {citizen.name}
                    </td>


                    {/* Email */}

                    <td className="border p-3">
                      {citizen.email}
                    </td>


                    {/* Phone */}

                    <td className="border p-3">
                      {citizen.phone}
                    </td>


                    {/* Department */}

                    <td className="border p-3">
                      {citizen.department}
                    </td>


                    {/* Actions */}

                    <td className="border p-3 whitespace-nowrap">

                      {/* Edit Button */}

                      <button
                        onClick={() =>
                          editCitizen(citizen.id)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>


                      {/* Delete Button */}

                      <button
                        onClick={() =>
                          deleteCitizen(citizen.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
          </div>
  );
};

export default Citizen;