import * as React from "react";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import HomePageMain from "../components/HomePageMain";
import Navbar2 from "./Navbar2";


export default function Home(props) {
  return (
    <>
      <AppTheme {...props}>
        <Container
          maxWidth="ulg"
          component="main"
          sx={{ display: "flex", flexDirection: "column", my: 3, gap: 1 }}
        >
          <Navbar2/>
          <HomePageMain />
        </Container>
        <Footer />
      </AppTheme>
    </>
  );
}
