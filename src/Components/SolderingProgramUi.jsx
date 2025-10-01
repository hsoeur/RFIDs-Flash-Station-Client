import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import solderingImage from "../assets/rfid.png";
import StyledContainer from "./StyledContainer";
import BarcodeManufacturing from "./BarcodeManufacturing";
import OperatorStation from "./OperatorStation";
import ProgStation from "./ProgStation";
import LogTokens from "./LogTokens";
import SequenceInformation from "./SequenceInformation";
import GeneralFunction from "./GeneralFunction";

const SolderingProgramUi = () => {
  const [barcodeText, setBarcodeText] = useState(""); // État pour stocker le code-barres
  const [solderingData, setSolderingData] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [readTokenResponses, setReadTokenResponses] = useState([]); // Liste pour accumuler les tokens

  const handleBarcodeResponse = (data) => {
    setSolderingData(data);
    console.log("Received data in SolderingProgramUi:", data);
  };


  const handleBarcodeTextChange = (text) => {
    setBarcodeText(text); // Met à jour le texte du code-barres
  };

  const handleStationSelect = (station) => {
    if (station === "Station 1") setSelectedStation("1");
    if (station === "Station 2") setSelectedStation("2");
    if (station === "Station 3") setSelectedStation("3");
  };

  const handleAddToken = (newToken) => {
    // Ajouter un nouveau token à la liste existante
    setReadTokenResponses((prevTokens) => [...prevTokens, newToken]);
  };

  const handleBackToBarcode = () => {
    // Réinitialise les états pour revenir au composant BarcodeManufacturing
    setSolderingData(null);
    setSelectedStation(null);
    setBarcodeText("");
    setReadTokenResponses([]);
  };

  

  return (
    <StyledContainer 
      variant="page"
      title="Programmation des Tags RFID"
      subtitle="Programmation des tags RFID pour la machine de brasage sélectif"
      showLogo={false}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {/* Colonne gauche : SequenceInformation */}
        <Box
          sx={{
            flex: 2,
            minWidth: "280px",
          }}
        >
          <SequenceInformation
            ManufacturingOrderUid={barcodeText || "N/A"}
            Product={solderingData?.productUid || "N/A"}
            Program={solderingData?.program || "N/A"}
            Station={selectedStation || "N/A"}
            Side={solderingData?.side || "N/A"}
          />

          <GeneralFunction onBackToBarcode={handleBackToBarcode} />
        </Box>

        {/* Colonne principale */}
        <Box
          sx={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!solderingData ? (
            <BarcodeManufacturing
              onResponse={handleBarcodeResponse}
              onBarcodeChange={handleBarcodeTextChange}
            />
          ) : (
            <>
              {!selectedStation ? (
                <OperatorStation onStationSelect={handleStationSelect} />
              ) : (
                <ProgStation
                  selectedStation={selectedStation}
                  solderingData={solderingData}
                  onAddToken={handleAddToken}
                />
              )}
            </>
          )}
        </Box>

        {/* Colonne des tokens */}
        {solderingData && selectedStation && (
          <Box
            sx={{
              flex: 2,
              minWidth: "280px",
            }}
          >
            <LogTokens tokens={readTokenResponses} />
          </Box>
        )}
      </Box>
    </StyledContainer>
  );
};

export default SolderingProgramUi;
