import React, { useState, useEffect } from "react";
import { handelError, handelSuccess } from "../utilities/utils";

const PostUpdate = ({ show, onClose, updatePost, post }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [blogtext, setBlogText] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form fields with the current post data
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setBlogText(post.blogText || "");
      setCategory(post.category || "");
    }
  }, [post]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the updatePost function passed as a prop
    setIsLoading(true);

    const response = await updatePost(post._id, {
      image,
      title,
      blogtext,
      category,
    });

    setIsLoading(false);

    // Close the modal after submission if needed
    if (response.success) {
      handelSuccess("Post Update Successfully..")
      onClose(); // Close modal on success
    }else{
      handelError(response.message)
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Post</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="blogtext" className="form-label">
                  Blog Text
                </label>
                <textarea
                  className="form-control"
                  id="blogtext"
                  value={blogtext}
                  onChange={(e) => setBlogText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                   className="form-control"
                   id="category"
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   required
                />
                <div className="mt-2 text-muted">
                  Displayed as: {category.replace(/\s+/g, "")}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                 Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;
