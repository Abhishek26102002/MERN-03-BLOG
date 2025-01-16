import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import { jwtDecode } from "jwt-decode";
import { handelError, handelSuccess } from "../utilities/utils";

const LatestSingle = ({ getAllPost, selectedUserPosts }) => {
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
    <div>
      {getAllPost.map((article, index) => (
        <div className="card border-0 mb-4" key={index}>
          <div className="row g-4">
            <div className="col-md-4">
              <img
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
                src={article.image}
                alt={article.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text text-muted">{article.blogText}</p>
                <div className="d-flex align-items-center mt-3">
                  <img
                    src={
                      selectedUserPosts[article.createdBy]?.avatar ||
                      "https://img.icons8.com/cotton/128/user-female--v6.png"
                    }
                    alt={"User"}
                    className="rounded-circle me-2"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <span className="me-3">
                    {" "}
                    {selectedUserPosts[article.createdBy]?.name || "Unknown"}
                  </span>
                  <div className="d-flex align-items-center">
                    {/* Like/Unlike Button */}
                    <button
                      className="btn btn-white d-flex align-items-center"
                      onClick={() => handleLike(article._id)}
                      style={{ border: "none", padding: "0" }}
                    >
                      <img
                        width="24"
                        height="24"
                        src={
                          likedPosts[article._id] ||
                          article.upvoters.includes(userInfo.id)
                            ? "https://img.icons8.com/fluency/48/like--v1.png" // Liked Image
                            : "https://img.icons8.com/material-outlined/24/like--v1.png" // Unliked Image
                        }
                        alt="like-button"
                      />
                      <span className="ms-2">
                        {article.upvoters.length || 0}
                      </span>
                    </button>

                    {/* Upvoters Icons */}
                    <div className="d-flex align-items-center ms-3">
                      {article.upvoters.slice(0, 3).map((upvoter, i) => (
                        <img
                          key={i}
                          src={
                            selectedUserPosts[article.upvoters]?.avatar ||
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
                      {article.upvoters.length > 3 && (
                        <span className="ms-2 text-muted">
                          +{article.upvoters.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-muted ms-auto">
                    {formatTimeAgo(article.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestSingle;
