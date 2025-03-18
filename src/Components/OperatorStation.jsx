import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Instruction from "./Instruction";
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
          border: "1px solid #ccc",
          borderRadius: 2,
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
                backgroundColor: "rgba(0, 0, 255, 0.5)",
                pointerEvents: "none",
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
            backgroundColor: "#f4f4f4",
            padding: 2,
            borderRadius: 2,
            border: "1px solid #ccc",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            Confirmez votre sélection : {selectedStation}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleValidation}
            sx={{
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Valider
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OperatorStation;