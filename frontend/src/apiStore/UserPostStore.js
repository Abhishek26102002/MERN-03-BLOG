import { create } from "zustand";
import { handelError } from "../utilities/utils";

export const userPostStore = create((set) => ({
  posts: [], // Store for fetched posts
  setPosts: (posts) => set({ posts }),
  Allposts: [], // Store for fetched posts
  setAllPosts: (Onepost) => set({ Onepost }),
  Onepost: [], // Store for fetched posts
  setOnePost: (Onepost) => set({ Onepost }),
  user: [], // Store for fetched posts
  setuser: (user) => set({ user }),
  like: [], // Store for fetched posts
  setlike: (like) => set({ like }),

  // Fetch users posts by is
  fetchPosts: async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to update the post.",
        };
      }
      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/getpostbyid`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      // console.log("Fetched posts from API:", data); // Debug log
      set({ posts: data.data });

      return {
        success: true,
        message: "Posts fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { success: false, message: "Error fetching posts" };
    }
  },
  fetchAllPosts: async () => {
    try {
      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/getpost`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      // console.log("Fetched posts from API:", data); // Debug log
      set({ Allposts: data.data });

      return {
        success: true,
        message: "Posts fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { success: false, message: "Error fetching posts" };
    }
  },
  fetchAllcategory: async () => {
    try {
      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/getcategory`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      return {
        success: true,
        message: "Posts fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { success: false, message: "Error fetching posts" };
    }
  },
  fetchPostsbyuserid: async (id) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to update the post.",
        };
      }
      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/getpostusingid/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      // console.log("Fetched posts from API:", data); // Debug log
      set({ Onepost: data.data });

      return {
        success: true,
        message: "Posts fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { success: false, message: "Error fetching posts" };
    }
  },
  getpostbycategoryname: async (newcatname) => {
    const cat = `{"category":"${newcatname}"}`;

    try {
      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/getpostbycategoryname`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: cat,
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      return {
        success: true,
        message: "Posts acc to cat fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { success: false, message: "Error fetching posts" };
    }
  },
  getuserinfobypostid: async (id) => {
    try {
      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/getuserinfobypostid/${id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      // console.log("Fetched posts from API:", data); // Debug log
      set({ user: data.data });

      return {
        success: true,
        message: "user fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return { success: false, message: "Error fetching user" };
    }
  },

  // Create a new post
  createPost: async (newPost) => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      return {
        success: false,
        message: "You must be logged in to update the post.",
      };
    }

    const { image, title, blogtext, category } = newPost;

    // Validate required fields
    if (!image || !title || !blogtext || !category) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("blogText", blogtext);
      formData.append("category", category);

      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/createpost`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token
          },
          body: formData, // FormData is automatically handled
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create post.");
      }

      // Update posts in the state
      set((state) => ({
        posts: [...(state.posts || []), data.data],
      }));

      return {
        success: true,
        message: "Post created successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error creating post:", error);
      return { success: false, message: "Error creating post." };
    }
  },

  // Update a post
  updatePost: async (postId, updatedPost) => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      return {
        success: false,
        message: "You must be logged in to update the post.",
      };
    }

    const { image, title, blogtext, category } = updatedPost;

    // Validate required fields
    if (!title || !blogtext || !category) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image); // Append the image only if provided
      }
      formData.append("title", title);
      formData.append("blogText", blogtext);
      formData.append("category", category);

      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/updatepost/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token
          },
          body: formData, // Use FormData for file uploads
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        handelError(data.message);
        throw new Error(data.message || "Failed to update post.");
      }

      // Update the UI immediately
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? data.data : post
        ),
      }));

      return {
        success: true,
        message: "Post updated successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error updating post:", error);
      return { success: false, message: "Error updating post." };
    }
  },
  deletePost: async (postId) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to delete a post.",
        };
      }

      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/deletepost/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete post.");
      }

      // Remove the deleted post from the state
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }));

      return { success: true, message: "Post deleted successfully" };
    } catch (error) {
      console.error("Error deleting post:", error);
      return { success: false, message: "Error deleting post." };
    }
  },
  LikeUnlike: async (postId) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to Like a post.",
        };
      }

      const res = await fetch(
        `https://mern-03-blog-production.up.railway.app/api/post/upvote/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await res.json();
      // console.log("data",data);
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to Like post.");
      }

      set((state) => ({
        like: state.like.filter((post) => post._id !== postId),
      }));

      return { success: true, message1: "Success", message: data.message };
    } catch (error) {
      console.error("Error Liking post:", error);
      return { success: false, message: "Error Liking post." };
    }
  },
}));
