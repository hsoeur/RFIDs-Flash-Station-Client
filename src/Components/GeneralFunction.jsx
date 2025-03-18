import React from "react";
import { Box, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt"; // Import de l'icône

const GeneralFunction = ({ onBackToBarcode }) => {
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        startIcon={<RestartAltIcon />} // Ajout de l'icône
        onClick={onBackToBarcode}
        sx={{
          backgroundColor: "#e91e63", // Couleur rose
          color: "#fff", // Couleur du texte
          "&:hover": {
            backgroundColor: "#d81b60", // Couleur au survol
          },
          textTransform: "none", // Désactiver la capitalisation automatique
        }}
      >
        Retour à l'écran d'accueil
      </Button>
    </Box>
  );
};

export default GeneralFunction;
