import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Instruction from "./Instruction";
import StyledContainer, { ProfessionalButton } from "./StyledContainer";
import stationImage from "../assets/station-map.png";

const OperatorStation = ({ onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  const stations = [
    { id: 1, x: 409, y: 434, radius: 50 },
    { id: 2, x: 430, y: 200, radius: 50 },
    { id: 3, x: 55, y: 197, radius: 50 },
  ];

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedStation = stations.find(
      (station) =>
        Math.sqrt((x - station.x) ** 2 + (y - station.y) ** 2) <= station.radius
    );

    if (clickedStation) {
      const stationName = `Station ${clickedStation.id}`;
      setSelectedStation(stationName);
      if (onStationSelect) {
        onStationSelect(stationName);
      }
    } else {
      setSelectedStation(null);
    }
  };

  const handleValidation = () => {
    alert(`Vous avez validé ${selectedStation}`);
    setSelectedStation(null);
  };

  return (
    <StyledContainer showLogo={false}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Instruction text="Cliquez sur une station sur l'image pour sélectionner votre station." />
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            border: "2px solid #e0e0e0",
            borderRadius: '12px',
            overflow: "hidden",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleImageClick}
        >
          <img
            src={stationImage}
            alt="Station Map"
            style={{
              maxWidth: "100%",
              height: "auto",
              cursor: "pointer",
              display: "block",
            }}
          />
          {stations.map((station) => (
            <React.Fragment key={station.id}>
              <Box
                sx={{
                  position: "absolute",
                  top: `${station.y - station.radius}px`,
                  left: `${station.x - station.radius}px`,
                  width: `${station.radius * 2}px`,
                  height: `${station.radius * 2}px`,
                  borderRadius: "50%",
                  backgroundColor: "rgba(74, 111, 165, 0.6)",
                  pointerEvents: "none",
                  transition: "all 0.3s ease",
                  '&:hover': {
                    backgroundColor: "rgba(74, 111, 165, 0.8)",
                  }
                }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  top: `${station.y}px`,
                  left: `${station.x}px`,
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "40px",
                  pointerEvents: "none",
                }}
              >
                {station.id}
              </Typography>
            </React.Fragment>
          ))}
        </Box>
        {selectedStation && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              backgroundColor: "#f9fafb",
              padding: 3,
              borderRadius: '12px',
              border: "2px solid #4a6fa5",
              boxShadow: "0 6px 20px rgba(74, 111, 165, 0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1a1a1a",
                textAlign: "center",
              }}
            >
              Confirmez votre sélection : {selectedStation}
            </Typography>
            <ProfessionalButton
              variant="success"
              onClick={handleValidation}
              size="large"
            >
              Valider
            </ProfessionalButton>
          </Box>
        )}
      </Box>
    </StyledContainer>
  );
};

export default OperatorStation;