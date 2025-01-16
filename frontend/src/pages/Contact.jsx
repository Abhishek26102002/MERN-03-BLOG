import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import Contactcontent from "../components/Contactcontent";

export default function Contact(props) {
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
       
      </AppTheme>
      <Contactcontent />
      <Footer />
    </>
  );
}
