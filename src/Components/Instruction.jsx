import React from "react";
import { Typography, Box } from "@mui/material";

const Instruction = ({ text, image, imageWidth = "100%", imageHeight = "auto", status = "default" }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          borderColor: "#2d7a4f",
          backgroundColor: "#ffffff",
          accentColor: "#2d7a4f",
        };
      case "error":
        return {
          borderColor: "#d32f2f",
          backgroundColor: "#ffffff",
          accentColor: "#d32f2f",
        };
      default:
        return {
          borderColor: "#e0e0e0",
          backgroundColor: "#ffffff",
          accentColor: "#4a6fa5",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Box
      sx={{
        backgroundColor: config.backgroundColor,
        border: `1px solid ${config.borderColor}`,
        borderLeft: `4px solid ${config.accentColor}`,
        borderRadius: "4px",
        marginBottom: 3,
        padding: "16px 20px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Typography 
        sx={{
          color: "#2c3e50",
          fontWeight: 500,
          fontSize: "0.95rem",
          lineHeight: 1.6,
          letterSpacing: "0.01em",
          marginBottom: image ? 2 : 0,
        }}
      >
        {text}
      </Typography>

      {image && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
            padding: 1,
            backgroundColor: "#fafbfc",
            borderRadius: "4px",
            border: "1px solid #e1e4e8",
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Instruction illustration"
            sx={{
              width: imageWidth,
              height: imageHeight,
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Instruction;
