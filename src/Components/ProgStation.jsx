import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Instruction from "./Instruction";
import StyledContainer, { ProfessionalButton } from "./StyledContainer";
import axios from "axios";
import config from "../config";
import progImage from "../assets/prog.jpg";

const ProgStation = ({ selectedStation, solderingData, onAddToken }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instructionText, setInstructionText] = useState(
    "En attente d'un TAG : Veuillez poser un tag pour commencer..."
  );
  const [instructionImage, setInstructionImage] = useState(progImage);
  const [status, setStatus] = useState("default");

  const handleTagPlaced = async () => {
    setLoading(true);
    setError(null);

    try {
           // 1. Appeler SendEscape
      await axios.post(`${config.ApiHardware}/serial/SendEscape`);
      console.log("SendEscape appelé avec succès");

      // 2. Appeler SendToken avec les données dynamiques
      await axios.post(
        `${config.ApiHardware}/serial/SendToken?tokenProgram=${solderingData.program}&tokenStation=${selectedStation}`
      );
      console.log("SendToken appelé avec succès");

      // 3. Appeler ReadToken et récupérer la réponse
      const response = await axios.get(`${config.ApiHardware}/serial/ReadToken?programInitialized=${solderingData.program}`);
      const newToken = response.data;

      console.log("ReadToken réponse :", newToken);

      onAddToken(newToken);

      setInstructionText("Tag programmé avec succès !");
      setStatus("success"); // Succès
    } catch (err) {
      console.error("Une erreur est survenue :", err);

      setStatus("error");
      if (err.response && err.response.data && err.response.data.error) {
        switch (err.response.data.error) {
          case "TAG_ALREADY_PROGRAMMED":
            setError("⚠️ Le token contient déjà le bon programme.");
            break;
          case "INVALID_PROGRAM_ENTERED":
            setError("⚠️ Le TokenProgram programmé n'est pas le bon.");
            break;
          case "INVALID_TOKENPROGRAM":
            setError("⚠️ Le TokenProgram doit contenir au moins 3 chiffres différents de 0.");
            break;
          case "INVALID_TOKENSTATION":
            setError("⚠️ Le TokenStation doit commencer par '000' et finir par un seul chiffre non nul.");
            break;
          default:
            setError("⚠️ Aucun Tag détecté. Veuillez poser un tag et vérifier l'appareil.");
        }
      } else {
        setError("⚠️ Une erreur réseau s'est produite. Vérifiez votre connexion.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer showLogo={false}>
      <Box
        sx={{
          padding: 3,
          border: "1px solid #e0e0e0",
          borderRadius: '12px',
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: 5,
          textAlign: "center",
          backgroundColor: '#ffffff',
        }}
      >
        <Instruction
          text={instructionText}
          image={instructionImage}
          imageWidth="20%"
          imageHeight="20%"
          status={status}
        />

        <ProfessionalButton
          variant="primary"
          onClick={handleTagPlaced}
          disabled={loading}
          fullWidth
          size="large"
        >
          {loading ? "En cours..." : "Programmer le tag"}
        </ProfessionalButton>

        {error && (
          <Box
            sx={{
              mt: 3,
              padding: 3,
              backgroundColor: "#fdecea",
              border: "2px solid #d32f2f",
              borderRadius: '12px',
              animation: "shake 0.3s",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.25rem",
                color: "#d32f2f",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}
      </Box>
    </StyledContainer>
  );
};

export default ProgStation;
