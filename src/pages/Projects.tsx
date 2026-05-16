import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { api } from "../api/api";
import { message } from "antd";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteProject, setDeleteProject] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editProject, setEditProject] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      message.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/projects",
        {
          name,
          deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setDeadline("");
      setIsModalOpen(false);
      message.success("Project Created Successfully");

      fetchProjects();
    } catch (error) {
      message.error("Failed to create project");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProjects();
      message.success("Project Deleted Successfully");
    } catch (error) {
      message.error("Failed to delete project");
    }
  };

  const toggleComplete = async (project: any) => {
    try {
      const token = localStorage.getItem("token");

      const isCompleted = project.status === "Completed";

      await api.patch(
        `/api/projects/${project._id}`,
        {
          status: isCompleted ? "Incomplete" : "Completed",
          progress: isCompleted ? 0 : 100,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(
        isCompleted
          ? "Project Marked Incomplete"
          : "Project Completed Successfully"
      );

      fetchProjects();
    } catch (error) {
      message.error("Failed to update project status");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/api/projects/${editProject._id}`,
        {
          name: editName,
          status: editStatus,
          progress: editStatus === "Completed" ? 100 : 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditProject(null);
      message.success("Project Updated Successfully");

      fetchProjects();
    } catch (error) {
      message.error("Failed to update project");
    }
  };

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Projects
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Manage your project workflow
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl flex items-center gap-2 transition"
        >
          <Plus size={18} />
          New Project
        </button>

      </div>
      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map((item) => (

            <div
              key={item}
              className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="flex justify-between items-start mb-6">

                <div className="flex-1">
                  <div className="h-5 w-40 bg-slate-800 rounded-lg mb-3 animate-pulse" />

                  <div className="h-3 w-24 bg-slate-800 rounded-lg animate-pulse" />
                </div>

                <div className="h-6 w-20 bg-slate-800 rounded-full animate-pulse" />

              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mb-5 overflow-hidden">
                <div className="h-full w-1/2 bg-slate-700 rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-32 bg-slate-800 rounded-lg mb-6 animate-pulse" />
              <div className="flex gap-2">

                <div className="flex-1 h-10 bg-slate-800 rounded-xl animate-pulse" />

                <div className="flex-1 h-10 bg-slate-800 rounded-xl animate-pulse" />

                <div className="flex-1 h-10 bg-slate-800 rounded-xl animate-pulse" />

              </div>

            </div>

          ))}

        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.length > 0 ? (
            projects.map((proj: any) => (

              <div
                key={proj._id}
                onClick={() => setSelectedProject(proj)}
                className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-blue-500 transition shadow-lg cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">

                  <div>
                    <h3 className="text-lg font-semibold">
                      {proj.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {proj.progress || 0}% completed
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${proj.status === "Completed"
                        ? "bg-green-900 text-green-400"
                        : proj.status === "In Progress"
                          ? "bg-yellow-900 text-yellow-400"
                          : "bg-blue-900 text-blue-400"
                      }`}
                  >
                    {proj.status}
                  </span>

                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">

                  <div
                    className={`h-full transition-all ${proj.status === "Completed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                      }`}
                    style={{
                      width: `${proj.progress || 0}%`,
                    }}
                  />

                </div>

                <p className="text-gray-400 text-sm mb-5">
                  Deadline:{" "}
                  {proj.deadline
                    ? new Date(proj.deadline).toLocaleDateString()
                    : "No deadline"}
                </p>

                <div
                  className="flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >

                  <button
                    onClick={() => toggleComplete(proj)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${proj.status === "Completed"
                        ? "bg-yellow-600 hover:bg-yellow-500"
                        : "bg-green-600 hover:bg-green-500"
                      }`}
                  >
                    {proj.status === "Completed"
                      ? "Undo"
                      : "Complete"}
                  </button>
                  <button
                    onClick={() => {
                      setEditProject(proj);
                      setEditName(proj.name);
                      setEditStatus(proj.status);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-xl text-xs font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteProject(proj)}
                    className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-xl text-xs font-medium transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No projects found
            </div>
          )}

        </div>
      )}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                {selectedProject.name}
              </h2>

              <button onClick={() => setSelectedProject(null)}>
                <X />
              </button>

            </div>

            <p className="text-gray-400">
              Status: {selectedProject.status}
            </p>

            <p className="text-gray-400 mt-2">
              Progress: {selectedProject.progress || 0}%
            </p>

            <p className="text-gray-400 mt-2">
              Deadline:{" "}
              {selectedProject.deadline
                ? new Date(
                  selectedProject.deadline
                ).toLocaleDateString()
                : "No deadline"}
            </p>

          </div>

        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-96">

            <h2 className="text-xl font-bold mb-5">
              Create Project
            </h2>

            <input
              type="text"
              placeholder="Project name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-xl mb-4 outline-none"
            />

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-xl mb-5 outline-none"
            />

            <div className="flex gap-2">

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={createProject}
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-xl"
              >
                Create
              </button>

            </div>

          </div>

        </div>
      )}

      {deleteProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-96">

            <h2 className="text-xl font-bold mb-3">
              Delete Project
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">{deleteProject.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex gap-2">

              <button
                onClick={() => setDeleteProject(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDelete(deleteProject._id);
                  setDeleteProject(null);
                }}
                className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
      {editProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-96">

            <h2 className="text-xl font-bold mb-5">
              Edit Project
            </h2>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-xl mb-4 outline-none"
            />

            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded-xl mb-5 outline-none"
            >
              <option value="Incomplete">Incomplete</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex gap-2">

              <button
                onClick={() => setEditProject(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 rounded-xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>


  );
};

export default Projects;