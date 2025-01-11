const express = require("express");
const upload = require("../Middlewares/multer"); // Path to your multer setup
const {
  createPost,
  deletePost,
  getPost,
  updatePost,
  getbyid,
  upcount,
  getcategory,
  getpostbycategoryname,
  getpostusingid
} = require("../Controllers/postController");
const validateToken = require("../Middlewares/validateToken");

const router = express.Router();

// every method here is jwt verified so no worries
router.get("/getpost", getPost)

router.get("/getpostusingid/:id",validateToken, getpostusingid)

router.get("/getcategory", getcategory)

router.get("/getpostbycategoryname", getpostbycategoryname)


router.get("/getpostbyid",validateToken,getbyid);

router.post("/createpost",validateToken, upload.single("image"), createPost);

router.put("/updatepost/:id",validateToken,upload.single("image"), updatePost);

router.delete("/deletepost/:id",validateToken, upload.single("image"),deletePost);

router.put("/upvote/:id",validateToken,upcount)

module.exports = router;
