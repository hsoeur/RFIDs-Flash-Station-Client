import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import solderingImage from "../assets/rfid.png";
import BarcodeManufacturing from "./BarcodeManufacturing";
import OperatorStation from "./OperatorStation";
import ProgStation from "./ProgStation";
import LogTokens from "./LogTokens";
import SequenceInformation from "./SequenceInformation"; // Importer SequenceInformation
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Toujours aligné en ligne
          gap: 3,
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "90%",
          margin: "auto",
          mt: 5,
        }}
      >
        {/* Colonne gauche : SequenceInformation */}
        <Box
          sx={{
            flex: 2, // Taille de la colonne gauche
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
            flex: 4, // Taille de la colonne principale
            paddingLeft: 2,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <img
              src={solderingImage}
              alt="Soldering Process"
              style={{
                maxWidth: "50%", // Réduit la largeur de l'image à 50% de son conteneur
                height: "100px", // Maintient les proportions
                borderRadius: "8px",
              }}
            />
          </Box>

          

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
              mb: 3,
            }}
          >
            Programmation des Tags
          </Typography>
          {!solderingData ? (
            <BarcodeManufacturing
              onResponse={handleBarcodeResponse}
              onBarcodeChange={handleBarcodeTextChange} // Nouveau callback pour le texte
            />
          ) : (
            <>
              {!selectedStation ? (
                <Box sx={{ mt: 3 }}>
                  <OperatorStation onStationSelect={handleStationSelect} />
                </Box>
              ) : (
                <ProgStation
                  selectedStation={selectedStation}
                  solderingData={solderingData}
                  onAddToken={handleAddToken} // Passer le gestionnaire pour ajouter un token
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
            }}
          >
            <LogTokens tokens={readTokenResponses} />
          </Box>
        )}
      </Box>
    </>
    
    
  );
};

export default SolderingProgramUi;
