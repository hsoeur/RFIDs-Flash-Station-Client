import React, { useState } from "react";
import { apiData } from "../api";
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Instruction from "./Instruction";
import StyledContainer, { ProfessionalButton } from "./StyledContainer";
import config from "../config";

const BarcodeManufacturing = ({ onResponse, onBarcodeChange }) => {
  const [barcode, setBarcode] = useState(""); // État pour le code-barres
  const [loading, setLoading] = useState(false); // État pour le spinner
  const [error, setError] = useState(null); // État pour les erreurs
  const [solderingOptions, setSolderingOptions] = useState([]); // État pour les options
  const [selectedSide, setSelectedSide] = useState(""); // État pour le côté sélectionné

  const handleChange = (e) => {
    const value = e.target.value;
    setBarcode(value);
    onBarcodeChange(value); // Transmet le texte au parent
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const barcodeRegex = /^OF\d{5}$/; // Doit commencer par "OF" suivi de 5 chiffres
    if (!barcodeRegex.test(barcode)) {
      setError("Le code-barres doit commencer par 'OF' suivi de 5 chiffres.");
      return;
    }

    const manufacturingUid = barcode.slice(-5); // Récupère les 5 derniers caractères

    setLoading(true);
    setError(null);

    try {
      const result = await apiData.getSolderingProgramByManufacturingOrderUidLatestOne(manufacturingUid);

      const data = result.data;
      console.log("API Response:", data);

      if (data.length === 1) {
        // S'il y a un seul objet, le transmettre directement
        onResponse(data[0]);
      } else if (data.length === 2) {
        // S'il y a deux objets, stocker les options pour la sélection
        setSolderingOptions(data);
      } else {
        setError("Aucun programme trouvé pour ce code-barres.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Erreur lors de la récupération des données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = () => {
    // Trouver l'objet correspondant au côté sélectionné
    const selectedOption = solderingOptions.find(
      (option) => option.side === selectedSide
    );
    if (selectedOption) {
      onResponse(selectedOption); // Transmettre l'objet sélectionné au parent
      setSolderingOptions([]); // Réinitialiser les options
      setSelectedSide(""); // Réinitialiser la sélection
    }
  };

  if (loading) {
    return (
      <StyledContainer 
        loading={loading} 
        loadingText="Chargement des données de l'OF..."
        showLogo={false}
      />
    );
  }

  return (
    <StyledContainer showLogo={false}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Instruction text="Scanner le code barre de l'OF." />
        <TextField
          label="Scan ou entrez le code-barres"
          variant="outlined"
          value={barcode}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          fullWidth
          error={!!error}
          helperText={error}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4a6fa5',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4a6fa5',
              },
            },
          }}
        />
        <ProfessionalButton
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
        >
          Soumettre
        </ProfessionalButton>

        {solderingOptions.length === 2 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              mt: 2,
              p: 3,
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
              Veuillez sélectionner une option :
            </Typography>
            <RadioGroup
              value={selectedSide}
              onChange={(e) => setSelectedSide(e.target.value)}
            >
              <FormControlLabel
                value="FS"
                control={<Radio sx={{ color: '#4a6fa5', '&.Mui-checked': { color: '#4a6fa5' } }} />}
                label="Face Soudure"
              />
              <FormControlLabel
                value="FC"
                control={<Radio sx={{ color: '#4a6fa5', '&.Mui-checked': { color: '#4a6fa5' } }} />}
                label="Face Composant"
              />
            </RadioGroup>
            <ProfessionalButton
              variant="success"
              onClick={handleOptionSelect}
              disabled={!selectedSide}
              fullWidth
            >
              Confirmer
            </ProfessionalButton>
          </Box>
        )}
      </Box>
    </StyledContainer>
  );
};

export default BarcodeManufacturing;
