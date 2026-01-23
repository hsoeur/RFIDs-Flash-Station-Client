import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import StyledContainer, { ProfessionalButton } from "./StyledContainer";
import axios from "axios";
import config from "../config";

const RFIDReader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleReadTag = async () => {
    setLoading(true);
    setError(null);
    setToken(null);
    try {
      // Met l'appareil dans l'état d'écoute puis lit le tag brut
      const escapePath = import.meta.env.PROD ? "/sendEscape" : "/serial/SendEscape";
      await axios.post(`${config.ApiHardware}${escapePath}`);
      const response = await axios.get(`${config.ApiHardware}/serial/ReadTokenRaw`);
      setToken(response.data);
    } catch (err) {
      const apiErr = err?.response?.data?.error;
      if (apiErr === "TAG_ALREADY_PROGRAMMED") {
        setError("Le tag contient déjà le bon programme.");
      } else {
        setError("Impossible de lire le tag. Vérifiez l'appareil et réessayez.");
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
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1a1a1a", mb: 2 }}
        >
          Lecture du Tag RFID
        </Typography>

        <ProfessionalButton
          variant="secondary"
          onClick={handleReadTag}
          disabled={loading}
          fullWidth
          size="large"
        >
          {loading ? "Lecture en cours..." : "Lire le tag"}
        </ProfessionalButton>

        {error && (
          <Box
            sx={{
              mt: 3,
              padding: 2,
              backgroundColor: "#fdecea",
              border: "2px solid #d32f2f",
              borderRadius: "12px",
            }}
          >
            <Typography sx={{ color: "#d32f2f", fontWeight: 600 }}>
              {error}
            </Typography>
          </Box>
        )}

        {token && (
          <Box
            sx={{
              mt: 3,
              padding: 2,
              backgroundColor: "#f9fafb",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Contenu du tag
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 180 }}>
                <Typography sx={{ color: "#6b7280" }}>Program</Typography>
                <Typography sx={{ fontWeight: 600 }}>{token.tokenProgram ?? "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 180 }}>
                <Typography sx={{ color: "#6b7280" }}>Station</Typography>
                <Typography sx={{ fontWeight: 600 }}>{token.tokenStation ?? "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 180 }}>
                <Typography sx={{ color: "#6b7280" }}>Direction A</Typography>
                <Typography sx={{ fontWeight: 600 }}>{token.directionA ?? "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 180 }}>
                <Typography sx={{ color: "#6b7280" }}>Direction B</Typography>
                <Typography sx={{ fontWeight: 600 }}>{token.directionB ?? "N/A"}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </StyledContainer>
  );
};

export default RFIDReader;
