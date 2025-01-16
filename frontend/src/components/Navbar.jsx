import "./Navbar.css"; // Include styles here or replace with inline styles.
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import DarkModeToggle from "../pages/DarkModeToggle";

const Navbar = () => {
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

  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="logo">
          <Link  style={{textDecoration:"none"}}  to="/">
            <img
              src="/logo.png"
              style={{ width: "60px", height: "60px" }}
              alt=""
            />
            <span className="logo-part1">Lea</span>
            <span  className="logo-part2">ves</span>
          </Link>
        </div>
        <nav  className={`nav-menu `} >
          <div className="d-flex gap-4">
            <Link to="/" className="btn btn-outline-light">
              Home
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Contact Us
            </Link>
            <Link to="/_404" className="btn btn-outline-light">
              Highlights
            </Link>
            <Link to="/about" className="btn btn-outline-light">
              About
            </Link>
          </div>
        </nav>
        <div className="right-section">
          {isLoggedIn ? (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {/* Changes gere */}
              <div
                className="d-flex flex-row justify-content-center rounded-pill"
                style={{
                  alignItems: "center",
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
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
                  <span style={{ margin: " 0px 10px" }}>
                    {userInfo.name ? userInfo.name : User}
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link className="btn btn-outline-light" to="/signin">
                Sign in
              </Link>
              <Link className="btn btn-outline-light" to="/signup">
                Sign up
              </Link>
            </>
          )}
          <DarkModeToggle />
        </div>
      </div>
      <div className="banner">
        <h1 className="banner-text">Tech that matters</h1>
        <div className="banner-wave"></div>
      </div>

      <div className="trending-section  p-3 bg-white border border-grey">
        <div className="d-flex align-items-center ">
          {/* Trending Label */}
          <span
            className="trending-label fw-bold text-black"
            style={{ marginRight: "20px" }}
          >
            Trending
          </span>

          {/* Trending Categories */}
          <div className="d-flex flex-wrap gap-2 flex-grow-1">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <button key={index} className="btn btn-outline-primary">
                  {category}
                </button>
              ))
            ) : (
              <span className="text-muted">Loading categories...</span>
            )}
          </div>

          {/* Search Bar */}
        </div>
        <div className="d-flex">
          <form className="d-flex ms-4" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-info" type="submit">
              Go
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
