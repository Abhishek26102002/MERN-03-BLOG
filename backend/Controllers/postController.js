const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Blog = require("../Models/blogs"); // Replace with the actual path to your Blog model
const path = require("path");
const Users = require("../Models/users");
const fs = require("fs");

// @desc create a post
// @route POST /api/createpost
// @access private (user Specific)
const createPost = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const { title, blogText, category } = req.body;
    if (!title || !blogText || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, blogText, category) are required.",
      });
    }

    // Public URL for the image
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const userId = req.user.id;

    const newPost = await Blog.create({
      image: imageUrl,
      title,
      blogText,
      createdBy: userId,
      category,
    });

    await Users.findByIdAndUpdate(
      userId,
      { $push: { blogs: newPost._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Blog post created successfully.",
      data: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error. Could not create the blog post.",
    });
  }
});

// @desc Get All post Available
// @route GET /api/getpost
// @access public
const getPost = asyncHandler(async (req, res) => {
  try {
    // Retrieve all users from the database
    const blogs = await Blog.find();

    // Check if users are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blog found",
      });
    }

    // Respond with all users
    res.status(200).json({
      success: true,
      data: blogs, // This will return all user details
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
  //get all Blog
});

// @desc post by jwt token (we are getting id by jwt token) of specific user
// @route POST /api/register
// @access public
const getbyid = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const blogs = await Blog.find({ createdBy: req.user.id });

    // Check if any blogs are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc post by jwt token (we are getting id by jwt token) of specific user
// @route POST /api/register
// @access private
const getpostusingid = asyncHandler(async (req, res) => {

  try {
    const { id } = req.params; // Blog ID from request parameters
    // Retrieve blogs created by a specific user
    const blogs = await Blog.find({ createdBy: id });

    // Check if any blogs are found
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc get category
// @route POST /api/getcategory
// @access public
const getcategory = asyncHandler(async (req, res) => {
  try {
    // Retrieve blogs created by a specific user
    const categories = await Blog.distinct("category");

    // Check if any blogs are found
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for this user",
      });
    }

    // Respond with the retrieved blogs
    res.status(200).json({
      success: true,
      message: "Success Fetching category",
      data: categories,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc get post of specifi category (eg. fetch all post that belong to the category MCU)
// @route POST /api/getpostbycategoryname
// @access public
const getpostbycategoryname = asyncHandler(async (req, res) => {
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  try {
    // Check if any blog exists with the given category
    const categoryExists = await Blog.exists({ category: category });

    if (!categoryExists) {
      return res
        .status(404)
        .json({ message: `No blogs found for category: ${category}` });
    }

    // Fetch blogs with the given category
    const blogs = await Blog.find({ category: category });

    res.status(200).json({
      success: true,
      message: "Success Fetching post according to category",
      data: blogs,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc update post
// @route PUT /api/update post
// @access private
// update Blog is by specific user we can do that either by jwt or by id but here jwt is best option
// give jwt
// give id as http string
const updatePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from request parameters
    const userId = req.user.id; // Authenticated user ID from JWT

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the authenticated user is the creator of the blog
    if (blog.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to update this blog",
      });
    }

    // Extract updatable fields from the request body
    const { title, blogText, category } = req.body;

    // Handle image file if provided
    const imagePath = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    // Update the blog fields
    blog.title = title || blog.title;
    blog.blogText = blogText || blog.blogText;
    blog.category = category || blog.category;

    if (imagePath) {
      blog.image = imagePath;
    }

    // Save the updated blog
    const updatedBlog = await blog.save();

    // Respond with the updated blog
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error. Could not update the blog",
    });
  }
});

// @desc delete post
// @route POST /api/deletepost
// @access private
const deletePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from request parameters
    const userId = req.user.id; // Authenticated user ID from JWT
    const isAdmin = req.user.is_Admin; // Check if the user is an admin

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the authenticated user is the creator or an admin
    if (blog.createdBy.toString() !== userId && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to delete this blog",
      });
    }

    // Optionally, delete the image file if it exists
    if (blog.image) {
      const imagePath = path.join(__dirname, "../", blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the blog from the database
    await blog.deleteOne();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error. Could not delete the blog",
    });
  }
});


// @desc Like or unlike post
// @route POST /api/upcount
// @access private
const upcount = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Blog ID from request parameters
    const userId = req.user.id; // Authenticated user ID from JWT

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if user has already upvoted
    const userIndex = blog.upvoters ? blog.upvoters.indexOf(userId) : -1;

    if (userIndex === -1) {
      // User hasn't upvoted, increment the count and add user to upvoters
      blog.blogUpPoint += 1;
      blog.upvoters = blog.upvoters || [];
      blog.upvoters.push(userId);
    } else {
      // User has already upvoted, decrement the count and remove user from upvoters
      blog.blogUpPoint -= 1;
      blog.upvoters.splice(userIndex, 1);
    }

    // Save the updated blog
    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: userIndex === -1 ? "Upvoted successfully" : "Upvote removed",
      data: {
        blogUpPoint: updatedBlog.upvoters.length,
        upvoters: updatedBlog.upvoters,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error. Could not toggle upvote",
    });
  }
});

module.exports = {
  createPost,
  deletePost,
  getPost,
  updatePost,
  getbyid,
  upcount,
  getcategory,
  getpostbycategoryname,
  getpostusingid
};
