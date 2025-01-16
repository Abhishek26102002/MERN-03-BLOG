import React, { useState } from "react";
import "./Footer.css"; // Create this CSS file for custom styles and animations
import "@fortawesome/fontawesome-free/css/all.min.css";
import emailjs from "emailjs-com";
import { handelError, handelSuccess } from "../utilities/utils";
export default function Footer() {


  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implement your subscription logic here.
    if (!formData.email) {
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
            handelSuccess("Subscribed !");
            setFormData({
              email: "",
            });
          },
          (error) => {
            console.error("Failed to send email:", error);
            handelError(error);
          }
        );
    }
  };
  return (
    <>
      <footer className="bg-light text-center py-4">
        <div className="container">
          {/* Section: Social media */}
          <section className="mb-4">
            <a
              className="btn btn-floating m-1 social-icon social-icon-facebook"
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-floating m-1 social-icon social-icon-twitter"
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-floating m-1 social-icon social-icon-google"
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-floating m-1 social-icon social-icon-instagram"
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-floating m-1 social-icon social-icon-linkedin"
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn btn-floating m-1 social-icon social-icon-github"
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/* Section: Social media */}

          {/* Section: Newsletter Form */}
          <section className="mb-4">
            <form onSubmit={handleSubscribe}>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Get Latest Update </strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form5Example24"
                      className="form-control"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mb-4"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
          {/* Section: Newsletter Form */}
        </div>
        {/* Section: Links */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Leaves
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Candor SEZ , Kolkata
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  abhishek1shaw2@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fab fa-instagram me-3"></i> @abh_i_shek
                </p>
              </div>
              {/* Grid column */}
            </div>
          </div>
        </section>
        {/* Section: Links */}

        {/* Copyright */}
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2025 Leaves. All rights reserved.
        </div>
        {/* Copyright */}
      </footer>
    </>
  );
}
