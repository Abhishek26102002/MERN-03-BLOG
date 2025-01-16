import React, { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import PostUpdate from "../modals/PostUpdate";
import { handelError, handelSuccess } from "../utilities/utils";

const formatTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  return `${formatDistanceToNowStrict(date)} ago`;
};

const Profileblog = ({ posts = [] }) => {
  const { updatePost, deletePost } = userPostStore();
  const [selectedPost, setSelectedPost] = useState(null);

  const openUpdateModal = (post) => {
    setSelectedPost(post);
  };

  const closeUpdateModal = () => {
    setSelectedPost(null);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const response = await deletePost(postId);
      handelSuccess("Post deleted Successfully..!");
      if (!response.success) {
        handelError(response.message);
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {posts.length > 0 ? (
          posts.map((blog, index) => (
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5 className="card-title">{blog.title}</h5>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "0.5rem",
                          }}
                        >
                          <button
                            onClick={() => openUpdateModal(blog)}
                            className="btn btn-sm btn-outline-info"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeletePost(blog._id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div
                        style={{ justifyContent: "space-between" }}
                        className="d-flex align-items-center"
                      >
                        <small className="text-muted">
                          {blog.blogText.length > 25
                            ? `${blog.blogText.slice(0, 25)}...`
                            : blog.blogText}
                        </small>

                        <small
                          style={{ display: "block", right: "1px" }}
                          className="text-muted"
                        >
                          • {formatTimeAgo(blog.updatedAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5>
            No posts found 😢{" "}
            <button className="btn btn-outline-success">Create a post</button>
          </h5>
        )}
      </div>

      {/* Update Modal */}
      {selectedPost && (
        <PostUpdate
          show={Boolean(selectedPost)}
          onClose={closeUpdateModal}
          updatePost={updatePost}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default Profileblog;
