import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Instruction from "./Instruction";
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
      const result = await axios.get(
        `${config.ApiData}/SolderingProgram/GetSolderingProgramByManufacturingOrderUidLatestOne?manufacturingOfUid=${manufacturingUid}`
      );

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

  return (
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
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Soumettre"}
      </Button>

      {solderingOptions.length === 2 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h6">Veuillez sélectionner une option :</Typography>
          <RadioGroup
            value={selectedSide}
            onChange={(e) => setSelectedSide(e.target.value)}
          >
            <FormControlLabel
              value="FS"
              control={<Radio />}
              label="Face Soudure"
            />
            <FormControlLabel
              value="FC"
              control={<Radio />}
              label="Face Composant"
            />
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOptionSelect}
            disabled={!selectedSide}
          >
            Confirmer
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BarcodeManufacturing;
