import { create } from "zustand";
import { handelError } from "../utilities/utils";

// If no token is passed as an argument, get the token from localStorage

export const userStore = create((set) => ({
  users: [], // Store for fetched users
  setUsers: (users) => set({ users }),
  
  Allusers: [], // Store for fetched users
  setAllUsers: (Allusers) => set({ Allusers }),

  // Fetch all users
  fetchUsers: async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to update the post.",
        };
      }
      const res = await fetch(`https://mern-03-blog-production.up.railway.app/api/getusers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      // console.log("Fetched users from API:", data); // Debug log
      set({ Allusers: data.data });

      return {
        success: true,
        message: "Users fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, message: "Error fetching users" };
    }
  },
  // Register a new user
  registerUser: async (newUser) => {
    const { name, email, pass } = newUser;

    // Validate required fields
    if (!name || !email || !pass) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch(`https://mern-03-blog-production.up.railway.app/api/userregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      if (!res.ok || !data.success){
        handelError(data.message);
        throw new Error(data.message || "Failed to register user.");
      }

      return {
        success: true,
        message: "User registered successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, message: "Error registering user." };
    }
  },

  // Login a user
  loginUser: async (credentials) => {
    const { email, pass } = credentials;

    // Validate required fields
    if (!email || !pass) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch(`https://mern-03-blog-production.up.railway.app/api/userlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok || !data.success){
        handelError(data.message);
          throw new Error(data.message || "Failed to login user.");
      }

      return {
        success: true,
        message: "User logged in successfully",
        token: data.token,
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { success: false, message: "Error logging in user." };
    }
  },

  // Update a user
  updateUser: async (updatedUser, token) => {
    const { email, name, pass } = updatedUser;

    // Validate input fields
    if (!email) {
      return {
        success: false,
        message: "Email is required to update user details.",
      };
    }
    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      return {
        success: false,
        message: "You must be logged in to update the user.",
      };
    }

    try {
      console.log(authToken);
      const res = await fetch(`https://mern-03-blog-production.up.railway.app/api/userupdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        handelError(data.message);
        throw new Error(data.message || "Failed to update user.");
      }

      // Update the UI immediately
      set((state) => ({
        users: state.users.map((user) =>
          user.email === email ? data.user : user
        ),
      }));

      return {
        success: true,
        message: "User updated successfully",
        user: data.user,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false, message: "Error updating user." };
    }
  },

  // Delete a user
  deleteUser: async (email) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to update the post.",
        };
      }
      const res = await fetch(`https://mern-03-blog-production.up.railway.app/api/userdelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok || !data.success){
        handelError(data.message);
        throw new Error(data.message || "Failed to delete user.");
      }

      // Update the UI immediately
      set((state) => ({
        users: state.users.filter((user) => user.email !== email),
      }));

      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false, message: "Error Deleting user "};
    }
  },
  // itself
  fetchitself: async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return {
          success: false,
          message: "You must be logged in to get urself.",
        };
      }
      const res = await fetch(`https://mern-03-blog-production.up.railway.app/api/getitself`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();

      if (!data.success){
        handelError(data.message);
        throw new Error(data.message);
      } 
      // console.log("Fetched user from API:", data); // Debug log
      set({ users: data.data });

      return {
        success: true,
        message: "Users fetched successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, message: "Error fetching users" };
    }
  },
}));
