import { useState } from "react";
import { Plus, X } from "lucide-react";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Mock data - Isay aap baad mein API se replace karenge
  const projects = [
    { id: 1, name: "Website Redesign", progress: 75, status: "Active", deadline: "May 10" },
    { id: 2, name: "API Integration", progress: 40, status: "In Progress", deadline: "May 15" },
    { id: 3, name: "Mobile App", progress: 100, status: "Completed", deadline: "April 20" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-500 transition">
          <Plus size={20} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div 
            key={proj.id} 
            onClick={() => setSelectedProject(proj)}
            className="bg-slate-900 border border-slate-800 p-6 rounded-3xl cursor-pointer hover:border-blue-500 transition"
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">{proj.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${proj.status === 'Completed' ? 'bg-green-900 text-green-400' : 'bg-blue-900 text-blue-400'}`}>
                {proj.status}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-blue-500 h-full" style={{ width: `${proj.progress}%` }}></div>
            </div>
            <p className="text-gray-400 text-sm">{proj.progress}% completed</p>
          </div>
        ))}
      </div>

      {/* Modal / Popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-md border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
              <button onClick={() => setSelectedProject(null)}><X /></button>
            </div>
            <p className="text-gray-400">Deadline: {selectedProject.deadline}</p>
            <button className="mt-6 w-full bg-blue-600 py-3 rounded-xl">View Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;