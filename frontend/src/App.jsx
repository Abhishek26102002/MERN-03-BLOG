import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import _404 from "./pages/_404";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { useState, useEffect } from "react";
import RefreshHandler from "./utilities/RefreshHandler";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(null); // Loading state
  const [is_Admin, setIsAdmin] = useState(false); // Track if user is admin
  const location = useLocation();

  // Determine if the Navbar should be shown
  const hideNavbarPaths = ["/admin", "/user", "/signin", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  // PrivateRoute to handle general and admin-specific routes
  const PrivateRoute = ({ element, requiresAdmin = false }) => {
    if (isAuthenticated === null) return <div>Loading...</div>; // Fallback during auth check
    if (!isAuthenticated) return <Navigate to={"/signin"} />; // Redirect unauthenticated users

    // If the route requires admin access, check is_Admin
    if (requiresAdmin && !is_Admin) return <Navigate to={"/user"} />;

    return element;
  };

  return (
    <>
      {/* RefreshHandler handles authentication and admin state */}
      <RefreshHandler
        setisAuthenticated={setisAuthenticated}
        setIsAdmin={setIsAdmin}
      />
      {shouldShowNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/_404" element={<_404 />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<AdminDashboard />} requiresAdmin={true} />
          }
        />
        <Route
          path="/user"
          element={<PrivateRoute element={<UserDashboard />} />}
        />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
