import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import { jwtDecode } from "jwt-decode";
import { formatDistanceToNowStrict } from "date-fns";
import { handelError, handelSuccess } from "../utilities/utils";

const TopSixPost = ({ getAllPost, selectedUserPosts }) => {
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
    <Row xs={1} md={2} lg={3} className="g-4">
      {getAllPost.map((post, index) => (
        <Col key={index}>
          <Card>
            <CardImg
              variant="top"
              src={post.image}
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />
            <CardBody>
              <Badge bg="secondary" className="mb-2">
                {post.tag}
              </Badge>
              <CardTitle>{post.title}</CardTitle>
              <CardText>{post.blogText}</CardText>
              <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Author Info */}
                <div className="d-flex align-items-center">
                  <img
                    src={
                      selectedUserPosts[post.createdBy]?.avatar ||
                      "https://img.icons8.com/cotton/128/user-female--v6.png"
                    }
                    className="rounded-circle me-2"
                    alt="Author Avatar"
                    style={{ width: "35px", height: "35px" }}
                  />
                  <small className="text-muted">
                    {selectedUserPosts[post.createdBy]?.name || "Unknown"}
                  </small>
                  <span className="mx-2">•</span>
                  <small className="text-muted">
                    {formatTimeAgo(post.createdAt)}
                  </small>
                </div>

                {/* Like Button, Count, and Upvoters */}
                <div className="d-flex align-items-center">
                  {/* Like/Unlike Button */}
                  <button
                    className="btn btn-white d-flex align-items-center"
                    onClick={() => handleLike(post._id)}
                    style={{ border: "none", padding: "0" }}
                  >
                    <img
                      width="24"
                      height="24"
                      src={
                        likedPosts[post._id] ||
                        post.upvoters.includes(userInfo.id)
                          ? "https://img.icons8.com/fluency/48/like--v1.png" // Liked Image
                          : "https://img.icons8.com/material-outlined/24/like--v1.png" // Unliked Image
                      }
                      alt="like-button"
                    />
                    <span className="ms-2">{post.upvoters.length || 0}</span>
                  </button>

                  {/* Upvoters Icons */}
                  <div className="d-flex align-items-center ms-3">
                    {post.upvoters.slice(0, 3).map((upvoter, i) => (
                      <img
                        key={i}
                        src={
                          selectedUserPosts[post.upvoters]?.avatar ||
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
                    {post.upvoters.length > 3 && (
                      <span className="ms-2 text-muted">
                        +{post.upvoters.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TopSixPost;
