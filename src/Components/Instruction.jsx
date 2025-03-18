import React from "react";
import { Typography, Box } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const Instruction = ({ text, image, imageWidth = "100%", imageHeight = "auto", status = "default" }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "success":
        return "#e0f7fa"; // Couleur vert/bleu clair pour le succès
      case "error":
        return "#fdecea"; // Couleur rouge clair pour l'erreur
      default:
        return "#f9f9f9"; // Couleur par défaut
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "success":
        return "#00796b"; // Texte vert foncé pour le succès
      case "error":
        return "#d32f2f"; // Texte rouge pour l'erreur
      default:
        return "#333"; // Texte par défaut
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        padding: 3,
        borderRadius: 3,
        marginBottom: 3,
        textAlign: "center",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          marginBottom: 2,
        }}
      >
        <InfoOutlined fontSize="large" sx={{ color: getTextColor() }} />
        <Typography variant="h6" fontWeight="bold">
          {text}
        </Typography>
      </Box>
      {image && (
        <Box
          component="img"
          src={image}
          alt="Instruction illustration"
          sx={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: 2,
            marginTop: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      )}
    </Box>
  );
};

export default Instruction;
