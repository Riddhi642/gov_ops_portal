import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  FolderKanban,
  X,
} from "lucide-react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject as deleteProjectFromService,
  type ProjectData,
} from "../services/api";

const Projects = () => {
  // =========================
  // FORM STATES
  // =========================

  const [projectName, setProjectName] = useState("");
  const [department, setDepartment] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // SEARCH
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // PROJECTS
  // =========================

  const [projects, setProjects] =
    useState<ProjectData[]>(() => getProjects());

  // =========================
  // EDIT
  // =========================

  const [editId, setEditId] =
    useState<number | null>(null);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setProjectName("");
    setDepartment("");
    setBudget("");
    setStatus("");
    setEditId(null);
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !projectName.trim() ||
      !department ||
      !budget.trim() ||
      !status
    ) {
      alert("Please fill all fields");
      return;
    }

    const isEditing = editId !== null;

    const newProject: ProjectData = {
      id: editId ?? Date.now(),
      projectName: projectName.trim(),
      department,
      budget,
      status,
    };

    if (isEditing) {
      updateProject(newProject);

      setProjects((prev) =>
        prev.map((project) =>
          project.id === editId
            ? newProject
            : project
        )
      );

      alert("Project Updated Successfully!");
    } else {
      addProject(newProject);

      setProjects((prev) => [
        ...prev,
        newProject,
      ]);

      alert("Project Added Successfully!");
    }

    resetForm();
  };

  // =========================
  // SEARCH PROJECTS
  // =========================

  const filteredProjects =
    projects.filter((project) => {
      const searchText =
        search.toLowerCase();

      return (
        project.projectName
          .toLowerCase()
          .includes(searchText) ||
        project.department
          .toLowerCase()
          .includes(searchText) ||
        project.status
          .toLowerCase()
          .includes(searchText)
      );
    });

  // =========================
  // EDIT PROJECT
  // =========================

  const editProject = (id: number) => {
    const project = projects.find(
      (item) => item.id === id
    );

    if (!project) return;

    setProjectName(project.projectName);
    setDepartment(project.department);
    setBudget(project.budget);
    setStatus(project.status);
    setEditId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PROJECT
  // =========================

  const deleteProject = (id: number) => {
    const project = projects.find(
      (item) => item.id === id
    );

    if (!project) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.projectName}"?`
    );

    if (!confirmed) return;

    deleteProjectFromService(id);

    setProjects((prev) =>
      prev.filter(
        (project) => project.id !== id
      )
    );

    if (editId === id) {
      resetForm();
    }
  };

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Project Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage government projects and their details.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg w-fit">
          <FolderKanban size={20} />

          <span className="font-semibold">
            {projects.length} Projects
          </span>
        </div>
      </div>

      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {editId !== null
                ? "Edit Project"
                : "Add New Project"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {editId !== null
                ? "Update project information."
                : "Register a new government project."}
            </p>
          </div>

          {editId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <X size={17} />
              Cancel
            </button>
          )}

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Project Name */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project Name
              </label>

              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Department
              </label>

              <select
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Budget */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Budget
              </label>

              <input
                type="number"
                placeholder="Enter project budget"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-3 mt-5">

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {editId !== null
                ? "Update Project"
                : "Save Project"}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            )}

          </div>

        </form>
      </div>

      {/* =========================
          PROJECTS LIST
      ========================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Projects List
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Search and manage registered projects.
            </p>
          </div>

          {/* Search */}

          <div className="relative w-full sm:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* EMPTY STATE */}

        {filteredProjects.length === 0 ? (

          <div className="py-10 text-center">

            <FolderKanban
              size={42}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-slate-700">
              No Projects Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {search
                ? "No projects match your search."
                : "Add a new project to see it here."}
            </p>

          </div>

        ) : (

          /* PROJECT TABLE */

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-50">

                  <th className="text-left p-3 border-b text-sm font-semibold text-slate-700">
                    Project Name
                  </th>

                  <th className="text-left p-3 border-b text-sm font-semibold text-slate-700">
                    Department
                  </th>

                  <th className="text-left p-3 border-b text-sm font-semibold text-slate-700">
                    Budget
                  </th>

                  <th className="text-left p-3 border-b text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="text-center p-3 border-b text-sm font-semibold text-slate-700">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProjects.map(
                  (project) => (

                    <tr
                      key={project.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <td className="p-3 border-b font-medium text-slate-800">
                        {project.projectName}
                      </td>

                      <td className="p-3 border-b">

                        <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-sm">
                          {project.department}
                        </span>

                      </td>

                      <td className="p-3 border-b">
                        ₹ {project.budget}
                      </td>

                      <td className="p-3 border-b">

                        <span
                          className={`px-2.5 py-1 rounded-full text-sm ${
                            project.status === "Active"
                              ? "bg-green-50 text-green-700"
                              : project.status === "Completed"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {project.status}
                        </span>

                      </td>

                      <td className="p-3 border-b">

                        <div className="flex items-center justify-center gap-2">

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() =>
                              editProject(project.id)
                            }
                            title="Edit Project"
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                          >
                            <Pencil size={17} />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteProject(project.id)
                            }
                            title="Delete Project"
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Projects;