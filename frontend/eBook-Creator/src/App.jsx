import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import ViewbookPage from "./pages/ViewbookPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PublicLibraryPage from "./pages/PublicLibraryPage.jsx";
import PublicBookPage from "./pages/PublicBookPage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import ChatBox from "./components/chatbox/ChatBox.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/library" element={<PublicLibraryPage />} />
        <Route path="/library/:bookId" element={<PublicBookPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:bookId"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-book/:bookId"
          element={
            <ProtectedRoute>
              <ViewbookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ChatBox />
    </div>
  );
};

export default App;
