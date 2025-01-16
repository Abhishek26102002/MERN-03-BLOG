import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import DarkModeToggle from "../pages/DarkModeToggle";
import "./Navbar2.css";

const Navbar2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken.user);
        // console.log(username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { fetchAllcategory } = userPostStore();
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchAllcategory();
        setCategories(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav role="navigation" id="navMobile">
      <div id="menuToggle">
        {/* Checkbox for the toggle menu */}
        <input type="checkbox" id="menuCheckbox"/>

        {/* Hamburger spans */}
        <span></span>
        <span></span>
        <span></span>

        {/* Navigation menu */}
        <ul id="menu">
          <li>
            <div className="logo">
              <Link style={{ textDecoration: "none" }} to="/">
                <img
                  src="/logo.png"
                  style={{ width: "60px", height: "60px" }}
                  alt=""
                />
                <small className="logo-part1">Lea</small>
                <small className="logo-part2">ves</small>
              </Link>
            </div>
          </li>
          <li>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img
                width="40"
                height="40"
                src={
                  userInfo.avatar
                    ? userInfo.avatar
                    : "https://img.icons8.com/color/48/admin-settings-male.png"
                }
                alt=""
                className="border rounded-circle border-grey"
              />

              <small style={{ color: "#000", margin: " 0px 10px" }}>
                {userInfo.name ? userInfo.name : "User"}
              </small>
            </Link>
            <DarkModeToggle />
          </li>
          <li>
            <Link to="/admin">
              <label htmlFor="menuCheckbox" onClick={(e) => e.target.click()}>
                Home
              </label>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <label htmlFor="menuCheckbox" onClick={(e) => e.target.click()}>
                About
              </label>
            </Link>
          </li>
          <li>
            <label htmlFor="menuCheckbox">
              <Link to="/_404">Highlights</Link>
            </label>
          </li>
          <li>
            <label htmlFor="menuCheckbox">
              <Link to="/contact">Contact</Link>
            </label>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;
