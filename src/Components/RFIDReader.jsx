import { useState } from "react";
import { Box } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { apiHardware } from "../api";
import { ActionFooter, Feedback, Metric, ProfessionalButton, SectionHeading, Surface } from "./StyledContainer";

const RFIDReader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleReadTag = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setToken(null);
    try {
      await apiHardware.sendEscape();
      const response = await apiHardware.readTokenRaw();
      setToken(response.data);
    } catch (requestError) {
      const apiError = requestError?.response?.data?.error;
      setError(apiError === "TAG_ALREADY_PROGRAMMED"
        ? "Le tag contient déjà le bon programme."
        : "Impossible de lire le tag. Vérifiez sa position et la connexion du programmateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface component="section" aria-labelledby="read-title" sx={{ boxShadow: "none" }}>
      <SectionHeading title="Contrôler un tag sans le modifier" description="Cette action lit uniquement le contenu actuellement présent." />
      {error && <Feedback severity="error" title="Lecture impossible">{error}</Feedback>}
      {token && (
        <Box role="status" aria-live="polite" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, minmax(0, 1fr))" }, gap: 1.25 }}>
          <Metric label="Programme" value={token.tokenProgram} />
          <Metric label="Station" value={token.tokenStation} />
          <Metric label="Direction A" value={token.directionA} />
          <Metric label="Direction B" value={token.directionB} />
        </Box>
      )}
      <ActionFooter>
        <ProfessionalButton variant="secondary" startIcon={<VisibilityOutlinedIcon />} onClick={handleReadTag} disabled={loading}>
          {loading ? "Lecture en cours…" : "Lire le tag"}
        </ProfessionalButton>
      </ActionFooter>
    </Surface>
  );
};

export default RFIDReader;
