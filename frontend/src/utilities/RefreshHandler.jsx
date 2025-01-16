import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RefreshHandler = ({ setisAuthenticated, setIsAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    let is_Admin = false;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        isLoggedIn = !!decodedToken;
        is_Admin = decodedToken.user.is_Admin || false;
      } catch (error) {
        console.error("Invalid token:", error);
        isLoggedIn = false;
      }
    }

    setisAuthenticated(isLoggedIn);
    setIsAdmin(is_Admin);

    const protectedRoutes = ["/admin", "/user"];
    const restrictedForLoggedIn = ["/signin", "/signup"];

    if (isLoggedIn) {
      if (restrictedForLoggedIn.includes(location.pathname)) {
        navigate("/home", { replace: true });
      } else if (location.pathname === "/admin" && !is_Admin) {
        navigate("/user", { replace: true });
      }
    } else {
      if (protectedRoutes.includes(location.pathname)) {
        navigate("/signin", { replace: true });
      }
    }
  }, [location, setisAuthenticated, setIsAdmin, navigate]);

  return null;
};

export default RefreshHandler;
