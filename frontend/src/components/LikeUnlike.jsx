import React, { useEffect, useState } from "react";

import { userPostStore } from "/src/apiStore/UserPostStore.js";
import { jwtDecode } from "jwt-decode";
import { handelError, handelSuccess } from "../utilities/utils";

export default LikeUnlikepost = ({ postId }) => {
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

  return likedPosts[post._id] || post.upvoters.includes(userInfo.id); // true or false
};
