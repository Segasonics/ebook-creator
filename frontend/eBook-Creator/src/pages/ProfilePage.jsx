import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const ProfilePage = () => {
  const { user, updateUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({ name: user.name, email: user.email });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.PROFILE, {
        name: formData.name,
      });
      updateUser(response.data.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div>Loading profile...</div>;
  }
  return (
    <DashboardLayout activeMenu="profile">
      <div className="max-w-2xl mx-auto px-5">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 mt-10">
          Profile
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Manage your profile information
        </p>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              disabled
            />
            <div className="flex justify-end">
              <Button type="submit" loading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
