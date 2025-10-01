import React from "react";
import { Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ProfessionalButton } from "./StyledContainer";

const GeneralFunction = ({ onBackToBarcode }) => {
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ProfessionalButton
        variant="danger"
        startIcon={<RestartAltIcon />}
        onClick={onBackToBarcode}
      >
        Retour à l'écran d'accueil
      </ProfessionalButton>
    </Box>
  );
};

export default GeneralFunction;
