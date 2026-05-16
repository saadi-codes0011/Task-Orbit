import { useEffect, useState } from "react";
import { api } from "../api/api";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-8 text-white min-h-screen">
      <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">

        <div className="flex items-center gap-6">
          <img
            src={user?.profilePic || "https://via.placeholder.com/120"}
            className="w-28 h-28 rounded-full border-2 border-blue-500 object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">
              {user?.FirstName} {user?.LastName}
            </h2>
            <p className="text-gray-400 mt-1">{user?.email}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;