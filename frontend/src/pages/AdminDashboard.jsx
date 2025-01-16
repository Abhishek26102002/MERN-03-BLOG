import React, { useState } from "react";
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import Profileblog from "../components/ProfileblogCard";
import { useEffect } from "react";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import UserUpdate from "../modals/UserUpdate";
import { ToastContainer } from "react-toastify";
import PostCreate from "../modals/PostCreate";
import { userStore } from "../apiStore/UserStore";
import DashboardTabs from "./AdminDashboardTabs";
import { handelError, handelSuccess } from "../utilities/utils";

const AdminDashboard = () => {
  const { posts, fetchPosts, createPost, fetchAllPosts, Allposts } =
    userPostStore();
  const { fetchitself, fetchUsers, Allusers } = userStore();

  const [userData, setUserData] = useState(null); // Store user data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await fetchitself();
        setUserData(userInfo.data[0]); // Save user data
        await fetchUsers();
        await fetchPosts();
        await fetchAllPosts();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchitself, fetchUsers, fetchPosts, fetchAllPosts]);

  // console.log("At AdminDaashBoard",Allposts);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/signin");
      handelSuccess("Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
      handelError("Failed to log out.");
    }
  };

  // console.log("post that im getting", posts[0]?.upvoters?.length);
  const postCount = posts.length;
  const upvoteCount = 0;
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="first">
          <Link to="/">
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/fluency/48/leaf.png"
              alt="leaf"
            />
          </Link>
          <span className="navbar-brand mb-0 h3">
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Leaves
            </Link>
          </span>
        </div>
        <div className="second">
          <div className="secondtwo">
            <button
              onClick={openPostModal}
              className="btn btn-light create"
              style={{ border: "1px solid #000" }}
              aria-label="Open Create Post Modal"
            >
              Create Post
            </button>
            <PostCreate
              show={isPostModalOpen}
              onClose={closePostModal}
              createPost={async (postData) => {
                await createPost(postData);
                fetchAllPosts(); // Refresh posts after creating
              }}
            />
            <button
              style={{ margin: "0px 10px" }}
              className="btn btn-light FutureFunction"
            >
              <img
                width="21"
                height="24"
                src="https://img.icons8.com/material-two-tone/24/bell--v1.png"
                alt="bell--v1"
              />
            </button>
          </div>
          <div>
            <Link to="/admin" className="btn btn-sm">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/bubbles/100/writer-male.png"
                alt="leaf"
                style={{ borderRadius: "50%" }}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Navbar end */}

      <div className="profile-container">
        <div className="profile-header"></div>
        <div className="profile-content">
          <div className="blogs-section">
            <h3>WelCome to Admin DashBoard</h3>
            <hr />
            <div>
              <DashboardTabs
                Allposts={Allposts}
                posts={posts}
                users={Allusers}
                onPostChange={fetchAllPosts}
                onUserChange={fetchUsers}
              />
            </div>
          </div>
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <img
                src="https://img.icons8.com/bubbles/100/writer-male.png" // Replace with your avatar URL
                alt="Avatar"
                className="avatar-image"
              />
            </div>
            <div className="profile-info">
              {userData ? (
                <>
                  <h4>@{userData.name}</h4>
                  <p>
                    {postCount} Blogs - {posts[0]?.upvoters?.length || 0} Reads
                  </p>
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
            <div className="btnAdmin">
              <button
                onClick={openModal}
                className="btn btn-sm btn-outline-success"
              >
                Edit Profile
              </button>
              <UserUpdate
                show={isModalOpen}
                onClose={closeModal}
                onSuccess={fetchUsers} // Refresh users after update
              />
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </div>
            <div style={{ margin: "20px" }}>
              <Link
                to="/signin"
                onClick={handleLogout}
                className="btn btn-outline-warning"
              >
                Logout
              </Link>
            </div>
            <p>Nothing to read here.</p>
            <p className="join-date">Joined on 29 Sep 2023</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminDashboard;
