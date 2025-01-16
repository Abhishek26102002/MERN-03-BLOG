import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

const AboutUsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
}));

const ImageBox = styled(Box)({
  width: "100%",
  height: "250px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px",
});

const AboutUs = () => {
  const sections = [
    {
      id: 1,
      title: "Our Mission",
      text: "At our company, we are committed to delivering excellence in every aspect. Our mission is to create value and leave a lasting impact through our innovative solutions.",
      image: "https://img.freepik.com/free-vector/illustrated-people-business-training_52683-60661.jpg?t=st=1736953977~exp=1736957577~hmac=dcefd9994abadab4388fc14dbd794074a76703f221fcfffbb678c67254a5da79&w=996",
    },
    {
      id: 2,
      title: "Our Vision",
      text: "Our vision is to be a global leader in our industry, fostering growth and innovation while maintaining the highest standards of integrity and customer satisfaction.",
      image: "https://img.freepik.com/free-vector/multi-device-targeting-concept-illustration_114360-7405.jpg?uid=R141417707&ga=GA1.1.1493008547.1735794767&semt=ais_tags_boosted",
    },
    {
      id: 3,
      title: "Our Team",
      text: "Behind every success is a great team. We take pride in our skilled professionals who work tirelessly to achieve our goals and make a difference.",
      image: "https://img.freepik.com/free-vector/designer-collection-concept_23-2148508641.jpg?t=st=1736954104~exp=1736957704~hmac=12f5b1e7390a818b821bc509e50a8d6c6778d63dc6283409bd33a95267648f9f&w=996",
    },
  ];

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom   sx={{ fontWeight: "bold",mt:18, mb: -16 }}>
        About Us
      </Typography>
      <AboutUsSection>
        {sections.map((section, index) => (
          <Grid
            container
            spacing={10}
            alignItems="center"
            direction={index % 2 === 0 ? "row" : "row-reverse"}
            key={section.id}
          >
            <Grid item xs={12} sx={{mt:16}} md={6}>
              <Typography variant="h3" gutterBottom>
                {section.title}
              </Typography>
              <Typography variant="h6">{section.text}</Typography>
            </Grid>
            <Grid item xs={12} sx={{mt:16}} md={6}>
              <ImageBox
                style={{
                  backgroundImage: `url(${section.image})`,
                }}
              />
            </Grid>
          </Grid>
        ))}
      </AboutUsSection>
    </Container>
  );
};

export default AboutUs;
