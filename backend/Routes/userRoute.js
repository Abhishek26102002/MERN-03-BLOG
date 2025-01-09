const express = require("express");

const {
  userLogin,
  userupdate,
  userdelete,
  userRegister,
  getUsers,
} = require("../Controllers/userController");

const validateToken = require("../Middlewares/validateToken");

const router = express.Router();

// user/Admin crud
router.get("/getusers", validateToken, getUsers);

router.post("/userlogin", userLogin);

router.post("/userregister", userRegister);

router.put("/userupdate", validateToken, userupdate);

router.delete("/userdelete", validateToken, userdelete);

module.exports = router;
