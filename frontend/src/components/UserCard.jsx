import React, { useState } from "react";
import { handelError, handelSuccess } from "../utilities/utils";
import { userStore } from "../apiStore/UserStore";
import { userPostStore } from "../apiStore/UserPostStore";
import { useEffect } from "react";
import Profileblog from "../components/ProfileblogCard";

const UserCard = ({ users = [] }) => {
  const [selectedUserPosts, setSelectedUserPosts] = useState([]); // Store posts for the selected user
  const [loading, setLoading] = useState(false); // Loading state for user posts

  const { fetchUsers, deleteUser } = userStore();
  const { fetchPostsbyuserid } = userPostStore();

  const handleDeleteUser = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await deleteUser(email);

      if (!response.success) {
        handelError(response.message);
      } else {
        handelSuccess("User deleted successfully!");
        fetchUsers(); // Refresh the user list after deletion
      }
    }
  };

  const handleFetchUserPosts = async (userId) => {
    try {
      setSelectedUserPosts([]); // Clear previous posts immediately
      setLoading(true); // Set loading state
      const response = await fetchPostsbyuserid(userId); // Fetch posts by user ID
      if (response.success) {
        setSelectedUserPosts(response.data); // Update posts for the selected user
      } else {
        setSelectedUserPosts([]); // Clear posts if the response is unsuccessful
        handelError(response.message);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setSelectedUserPosts([]); // Ensure posts are cleared in case of error
      handelError("Failed to fetch posts for this user.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container my-4">
      <div className="accordion" id="usersAccordion">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${index}`}
                  onClick={() => handleFetchUserPosts(user._id)} // Fetch posts when the user accordion is expanded
                >
                  <div className="d-flex align-items-center w-100">
                    <img
                      src={
                        user.Avatar ||
                        "https://img.icons8.com/parakeet/48/user.png"
                      }
                      className="img-fluid rounded me-3"
                      alt="user Thumbnail"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <span>{user.name}</span>
                  </div>
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#usersAccordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>id: </strong> {user._id || "n/a"}
                  </p>
                  <p>
                    <strong>Email: </strong> {user.email}
                  </p>
                  <p>
                    <strong>Joined: </strong> {user.createdAt || "N/A"}
                  </p>
                  <p>
                    <strong>Role: </strong> {user.is_Admin ? "Admin" : "User"}
                  </p>
                  <div className="text-end">
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                  {loading ? (
                    <p>Loading posts...</p>
                  ) : selectedUserPosts.length > 0 ? (
                    <Profileblog key={user._id} posts={selectedUserPosts} />
                  ) : (
                    <p>This user has no posts.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5>No Users found 😢</h5>
        )}
      </div>
    </div>
  );
};

export default UserCard;
