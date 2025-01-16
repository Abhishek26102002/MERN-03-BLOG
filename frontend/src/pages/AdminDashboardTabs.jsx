import React, { useState } from "react";
import Profileblog from "../components/ProfileblogCard";
import UserCard from "../components/UserCard.jsx";

const AdminDashboardTabs = ({ Allposts, posts, users, onPostChange, onUserChange }) => {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <Profileblog posts={Allposts} onPostChange={onPostChange} />;
      case "admin":
        return <Profileblog posts={posts} onPostChange={onPostChange} />;
      case "user":
        return <UserCard users={users} onUserChange={onUserChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Post
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            Admin Post
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "user" ? "active" : ""}`}
            onClick={() => setActiveTab("user")}
          >
            Users
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboardTabs;
