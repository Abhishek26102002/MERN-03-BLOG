import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Grid
} from "@mui/material";
import { styled } from "@mui/system";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(to right bottom, #ffffff, #f8f9fa)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)"
  }
}));

const StyledTextField = styled(TextField)({
  marginBottom: "1.5rem",
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#1976d2"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2"
    }
  }
});


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ severity: "success", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        severity: "error",
        message: "Please fill in all required fields."
      });
    } else {
      emailjs
        .send(
          "service_k0w2vuk", // Replace with your EmailJS service ID
          "template_xbqu6yb", // Replace with your EmailJS template ID
          formData, // Form data
          "xfeb97RbexsMqDqED" // Replace with your EmailJS public key
        )
        .then(
          () => {
            setSubmitStatus({
              severity: "success",
              message: "Thank you for your message. We'll get back to you soon!"
            });
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "",
              category: "",
              message: ""
            });
          },
          (error) => {
            console.error("Failed to send email:", error);
            setSubmitStatus({
              severity: "error",
              message: "Failed to send your message. Please try again later."
            });
          }
        );
    }
    setOpenSnackbar(true);
  };
  
  

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold",mt:8, mb: 4 }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        We're here to help! Fill out the form below and we'll get back to you as soon as possible.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <StyledPaper component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-label="Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="Email"
                />
              </Grid>
            
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-label="Subject"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  aria-label="Message"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 3,
                height: 56,
                borderRadius: 2,
                fontSize: "1.1rem",
                textTransform: "none"
              }}
            >
              Send Message
            </Button>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ height: "100%" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Get in Touch
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FaMapMarkerAlt size={24} style={{ marginRight: "1rem", color: "#1976d2" }} />
                <Typography>
                  Candor Techspace,
                  <br />
                  Unitech Gate 2,
                  <br />
                  Kolkata Newtown, WB 700016
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FaPhone size={24} style={{ marginRight: "1rem", color: "#1976d2" }} />
                <Typography>+91 12345-67890</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FaEnvelope size={24} style={{ marginRight: "1rem", color: "#1976d2" }} />
                <Typography>mckvie25@gmail.com</Typography>
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={submitStatus.severity}
          sx={{ width: "100%" }}
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;