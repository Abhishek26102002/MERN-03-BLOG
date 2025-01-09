const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    name: { type: String, required: true},
    is_Admin: { type: Boolean, default: false }, // Defaults to false and is not required
    email: { type: String, required: true, unique: true},
    pass: { type: String, required: true }, // Store the hashed password
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blogs" }], // Reference to Blog collection
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userScheme);
// Users is Collection name in database
