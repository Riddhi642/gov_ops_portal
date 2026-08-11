import { useState } from "react";

// प्रत्येक Project चा Data Type
type ProjectData = {
  // NEW: प्रत्येक Project साठी unique ID
  id: number;

  projectName: string;
  department: string;
  budget: string;
  status: string;
};

const Projects = () => {

  // Form States
  const [projectName, setProjectName] = useState("");
  const [department, setDepartment] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");

  // Search State
  const [search, setSearch] = useState("");

  // Projects List
  const [projects, setProjects] = useState<ProjectData[]>([]);

  // NEW: कोणता Project Edit करत आहोत
  const [editId, setEditId] = useState<number | null>(null);


  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!projectName || !department || !budget || !status) {
      alert("Please fill all fields");
      return;
    }

    // NEW: Add किंवा Update हे check करण्यासाठी
    const isEditing = editId !== null;


    // New / Updated Project Object
    const newProject: ProjectData = {
      // NEW: Edit असेल तर जुना ID,
      // Add असेल तर नवीन ID
      id: editId ?? Date.now(),

      projectName,
      department,
      budget,
      status,
    };


    // NEW: Edit Mode
    if (isEditing) {

      // ज्याचा ID match होतो तो Project update करतो
      const updatedProjects = projects.map((project) =>
        project.id === editId
          ? newProject
          : project
      );

      setProjects(updatedProjects);

      // Edit Mode बंद करतो
      setEditId(null);

    } else {

      // NEW: Normal Add Project
      setProjects([...projects, newProject]);
    }


    // Form Reset
    setProjectName("");
    setDepartment("");
    setBudget("");
    setStatus("");


    // NEW: Add आणि Update साठी वेगवेगळा message
    alert(
      isEditing
        ? "Project Updated Successfully!"
        : "Project Added Successfully!"
    );
  };


  // Search Projects
  // NEW: Project Name किंवा Department वर search
  const filteredProjects = projects.filter(
    (project) =>
      project.projectName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      project.department
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  // NEW: Edit Project Function
  const editProject = (id: number) => {

    // ID वरून योग्य Project शोधतो
    const project = projects.find(
      (item) => item.id === id
    );

    // Project सापडला नाही तर काही करू नका
    if (!project) return;


    // Project ची माहिती Form मध्ये भरतो
    setProjectName(project.projectName);
    setDepartment(project.department);
    setBudget(project.budget);
    setStatus(project.status);

    // Edit Mode सुरू करतो
    setEditId(id);
  };


  // UPDATED: Delete Project
  // आधी index वापरत होतो, आता unique ID वापरतो
  const deleteProject = (id: number) => {

    const updatedProjects = projects.filter(
      (project) => project.id !== id
    );

    setProjects(updatedProjects);
  };


  return (

    <div className="p-6">

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Project Management
        </h1>


        {/* Project Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Project Name */}
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />


          {/* Department */}
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

          </select>


          {/* Budget */}
          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />


          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>


          {/* 
            UPDATED:
            Edit करताना "Update Project"
            आणि नवीन Project करताना
            "Save Project" दिसेल.
          */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {editId !== null
              ? "Update Project"
              : "Save Project"}
          </button>

        </form>

      </div>
            {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Projects List
        </h2>


        {/* Search Box */}
        {/* UPDATED: Project Name किंवा Department search करता येईल */}
        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-5"
        />

        <div className="overflow-x-auto">
        {/* Projects Table */}
        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-slate-100">

              <th className="border p-3">
                Project Name
              </th>

              <th className="border p-3">
                Department
              </th>

              <th className="border p-3">
                Budget
              </th>

              <th className="border p-3">
                Status
              </th>

              <th className="border p-3">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {/* जर Project नसेल */}
            {filteredProjects.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center p-5 text-gray-500"
                >
                  No Projects Added
                </td>

              </tr>

            ) : (

              // प्रत्येक Project Table मध्ये दाखवतो
              filteredProjects.map((project) => (

                <tr key={project.id}>

                  {/* Project Name */}
                  <td className="border p-3">
                    {project.projectName}
                  </td>


                  {/* Department */}
                  <td className="border p-3">
                    {project.department}
                  </td>


                  {/* Budget */}
                  <td className="border p-3">
                    ₹ {project.budget}
                  </td>


                  {/* Status */}
                  <td className="border p-3">
                    {project.status}
                  </td>


                  {/* Actions */}
                  <td className="border p-3">

                    {/* 
                      NEW:
                      Edit button
                      Project चा unique ID पाठवतो
                    */}
                    <button
                      onClick={() =>
                        editProject(project.id)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>


                    {/* 
                      UPDATED:
                      Delete button आता index ऐवजी
                      unique ID वापरतो
                    */}
                    <button
                      onClick={() =>
                        deleteProject(project.id)
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

export default Projects;