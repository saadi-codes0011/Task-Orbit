import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { api } from "../api/api";
import {
  Camera,
  User,
  Mail,
  Save,
  UploadCloud,
} from "lucide-react";

const ProfileSettings = () => {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    profilePic: "",
  });

  const [originalForm, setOriginalForm] = useState({
    FirstName: "",
    LastName: "",
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        FirstName: res.data.FirstName,
        LastName: res.data.LastName,
        email: res.data.email,
        profilePic: res.data.profilePic,
      });
      setOriginalForm({
        FirstName: res.data.FirstName,
        LastName: res.data.LastName,
      });
    } catch (err) {
      message.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    processFile(selectedFile);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;

    processFile(droppedFile);
  };

  const handleUpdate = async () => {
    try {

      const noImageChange = !file;

      const noNameChange =
        form.FirstName === originalForm.FirstName &&
        form.LastName === originalForm.LastName;

      if (noImageChange && noNameChange) {
        return message.warning(
          "Please update something before saving"
        );
      }
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("FirstName", form.FirstName);
      formData.append("LastName", form.LastName);

      if (file) {
        formData.append("profilePic", file);
      }

      const res = await api.put("/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setForm(res.data);

      window.dispatchEvent(new Event("userUpdated"));
      message.success("Profile updated successfully");

      localStorage.setItem("user", JSON.stringify(res.data));

      window.dispatchEvent(new Event("userUpdated"));
    } catch (err) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)]">

        <div className="mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Profile Settings
          </h2>

          <p className="text-slate-400 mt-2">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-10">

          <div>

            <div
              onDragOver={(e) => {
                e.preventDefault();

                if (!dragging) {
                  setDragging(true);
                }
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-3xl p-6 transition-all duration-300 ${dragging
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-slate-700 bg-slate-800/30"
                }`}
            >
              <div className="flex flex-col items-center">

                <div className="relative">

                  <img
                    src={
                      preview ||
                      form?.profilePic ||
                      "https://via.placeholder.com/150"
                    }
                    className="w-36 h-36 rounded-full object-cover border-4 border-slate-700 shadow-2xl"
                  />

                  <label className="absolute bottom-2 right-2 bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-full cursor-pointer hover:scale-110 transition">

                    <Camera size={18} />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {form?.FirstName} {form?.LastName}
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  {form?.email}
                </p>

                <div className="mt-6 text-center">
                  <UploadCloud
                    size={30}
                    className="mx-auto text-cyan-400 mb-2"
                  />

                  <p className="text-sm text-slate-300">
                    Drag & Drop image here
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    or click camera icon
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-slate-400">
                  First Name
                </label>

                <div className="relative mt-2">
                  <User
                    className="absolute left-3 top-3 text-slate-500"
                    size={18}
                  />

                  <input
                    value={form.FirstName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        FirstName: e.target.value,
                      })
                    }
                    className="w-full pl-10 p-3 bg-slate-800/50 border border-slate-700 rounded-2xl focus:border-cyan-500 outline-none transition"
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Last Name
                </label>

                <div className="relative mt-2">
                  <User
                    className="absolute left-3 top-3 text-slate-500"
                    size={18}
                  />

                  <input
                    value={form.LastName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        LastName: e.target.value,
                      })
                    }
                    className="w-full pl-10 p-3 bg-slate-800/50 border border-slate-700 rounded-2xl focus:border-cyan-500 outline-none transition"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-slate-400">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <Mail
                    className="absolute left-3 top-3 text-slate-500"
                    size={18}
                  />

                  <input
                    value={form?.email || ""}
                    disabled
                    className="w-full pl-10 p-3 bg-slate-800/30 border border-slate-700 rounded-2xl text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">

              <button
                disabled={loading}
                onClick={handleUpdate}
                className="min-w-[180px] flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-semibold hover:scale-105 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Spin size="small" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;