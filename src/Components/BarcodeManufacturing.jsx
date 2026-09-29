import { useEffect, useRef, useState } from "react";
import { Box, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { apiData } from "../api";
import {
  ActionFooter,
  Feedback,
  LoadingState,
  ProfessionalButton,
  SectionHeading,
  Surface,
} from "./StyledContainer";

const BarcodeManufacturing = ({ onResponse, onBarcodeChange }) => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [solderingOptions, setSolderingOptions] = useState([]);
  const [selectedSide, setSelectedSide] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, [error, solderingOptions.length]);

  const handleChange = (event) => {
    const value = event.target.value;
    setBarcode(value);
    setError(null);
    onBarcodeChange(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const barcodeRegex = /^OF\d{5}$/;
    if (!barcodeRegex.test(barcode)) {
      setError("Saisissez un identifiant au format OF suivi de 5 chiffres, par exemple OF12345.");
      inputRef.current?.focus();
      return;
    }

    const manufacturingUid = barcode.slice(-5);
    setLoading(true);
    setError(null);
    setSolderingOptions([]);

    try {
      const result = await apiData.getSolderingProgramByManufacturingOrderUidLatestOne(manufacturingUid);
      const data = result.data;
      if (Array.isArray(data)) {
        if (data.length === 1) onResponse(data[0]);
        else if (data.length > 1) setSolderingOptions(data);
        else setError("Aucun programme actif n’a été trouvé pour cet ordre de fabrication.");
      } else if (data?.solderingProgramUid) {
        onResponse(data);
      } else {
        setError("Aucun programme actif n’a été trouvé pour cet ordre de fabrication.");
      }
    } catch (requestError) {
      console.error("Error fetching data:", requestError);
      setError("Impossible de récupérer le programme. Vérifiez la connexion à l’API Data, puis réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = () => {
    const selectedOption = solderingOptions.find((option) => option.side === selectedSide);
    if (selectedOption) {
      onResponse(selectedOption);
      setSolderingOptions([]);
      setSelectedSide("");
    }
  };

  return (
    <Surface component="section" aria-labelledby="scan-title">
      <SectionHeading title="Scanner l’ordre de fabrication" description="Le programme actif sera récupéré automatiquement." />
      {loading ? (
        <LoadingState text="Recherche du programme de soudure…" minHeight={220} />
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: "primary.main" }}>
            <QrCodeScannerRoundedIcon aria-hidden="true" />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>Lecteur prêt — le curseur est placé dans le champ</Typography>
          </Box>
          <TextField
            inputRef={inputRef}
            autoFocus
            fullWidth
            label="Code de l’ordre de fabrication"
            placeholder="OF12345"
            value={barcode}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error || "Format attendu : OF suivi de 5 chiffres"}
            inputProps={{ autoComplete: "off", inputMode: "text" }}
          />
          {error && <Feedback severity="error" title="L’ordre de fabrication n’a pas pu être chargé" sx={{ mt: 2 }}>{error}</Feedback>}
          <ActionFooter>
            <ProfessionalButton type="submit" startIcon={<SearchRoundedIcon />} disabled={!barcode || loading}>
              Rechercher le programme
            </ProfessionalButton>
          </ActionFooter>
        </Box>
      )}

      {solderingOptions.length > 1 && (
        <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography component="h3" variant="h3">Quelle face allez-vous traiter ?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5 }}>Plusieurs programmes actifs sont disponibles pour cet OF.</Typography>
          <RadioGroup value={selectedSide} onChange={(event) => setSelectedSide(event.target.value)}>
            {solderingOptions.map((option) => (
              <FormControlLabel
                key={option.solderingProgramUid}
                value={option.side}
                control={<Radio />}
                label={`${option.side === "FS" ? "Face soudure" : option.side === "FC" ? "Face composants" : `Face ${option.side}`} — programme ${option.program}`}
                sx={{ minHeight: 48, mx: 0, px: 0.5, borderRadius: 2, "&:has(.Mui-checked)": { bgcolor: "primary.light" } }}
              />
            ))}
          </RadioGroup>
          <ActionFooter>
            <ProfessionalButton onClick={handleOptionSelect} disabled={!selectedSide}>Continuer avec cette face</ProfessionalButton>
          </ActionFooter>
        </Box>
      )}
    </Surface>
  );
};

export default BarcodeManufacturing;
