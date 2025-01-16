import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import { jwtDecode } from "jwt-decode";
import { handelError, handelSuccess } from "../utilities/utils";

const LatestFour = ({ getAllPost, selectedUserPosts }) => {
  const { LikeUnlike } = userPostStore();

  const [likedPosts, setLikedPosts] = useState({}); // Track liked status per post

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken.user);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    return `${formatDistanceToNowStrict(date)} ago`;
  };

  const handleLike = async (postId) => {
    try {
      const response = await LikeUnlike(postId);
      if (response.success) {
        handelSuccess(response.message);
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [postId]: !prevLikedPosts[postId], // Toggle like status for the specific post
        }));
      } else {
        handelError(response.message);
      }
    } catch (error) {
      handelError("An error occurred while liking the post.");
    }
  };
  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {getAllPost.map((blog, index) => (
          <div className="col" key={index}>
            <div className="card h-100 border-0">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={blog.image}
                    className="img-fluid rounded"
                    alt="Blog Thumbnail"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          selectedUserPosts[blog.createdBy]?.avatar ||
                          "https://img.icons8.com/cotton/128/user-female--v6.png"
                        }
                        className="rounded-circle me-2"
                        alt="Author Avatar"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <small className="text-muted">
                        {" "}
                        {selectedUserPosts[blog.createdBy]?.name || "Unknown"}
                      </small>
                      <span className="mx-2">•</span>
                      <div className="d-flex align-items-center">
                        {/* Like/Unlike Button */}
                        <button
                          className="btn btn-white d-flex align-items-center"
                          onClick={() => handleLike(blog._id)}
                          style={{ border: "none", padding: "0" }}
                        >
                          <img
                            width="24"
                            height="24"
                            src={
                              likedPosts[blog._id] ||
                              blog.upvoters.includes(userInfo.id)
                                ? "https://img.icons8.com/fluency/48/like--v1.png" // Liked Image
                                : "https://img.icons8.com/material-outlined/24/like--v1.png" // Unliked Image
                            }
                            alt="like-button"
                          />
                          <span className="ms-2">
                            {blog.upvoters.length || 0}
                          </span>
                        </button>

                        {/* Upvoters Icons */}
                        <div className="d-flex align-items-center ms-3">
                          {blog.upvoters.slice(0, 3).map((upvoter, i) => (
                            <img
                              key={i}
                              src={
                                selectedUserPosts[blog.upvoters]?.avatar ||
                                "https://img.icons8.com/arcade/64/user-female-circle.png"
                              }
                              className="rounded-circle"
                              alt="Upvoter Avatar"
                              style={{
                                width: "25px",
                                height: "25px",
                                marginLeft: i > 0 ? "-10px" : "0",
                                border: "2px solid white",
                              }}
                            />
                          ))}
                          {blog.upvoters.length > 3 && (
                            <span className="ms-2 text-muted">
                              +{blog.upvoters.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <small className="text-muted">
                        {formatTimeAgo(blog.createdAt)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestFour;
