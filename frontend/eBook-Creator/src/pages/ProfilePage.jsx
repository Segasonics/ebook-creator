import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="mt-10 mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-3"
          >
            <span className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Back to Dashboard
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Profile
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your profile information
          </p>
        </div>

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
