import * as React from "react";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";
import AppTheme from "../shared-theme/AppTheme";


export default function _404(props) {
  return (
    <AppTheme {...props}>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <h1>This page is Under dev 404 error</h1>
      </Container>
      <Footer />
    </AppTheme>
  );
}
