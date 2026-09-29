import { useState } from "react";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import { Box } from "@mui/material";
import { apiHardware } from "../api";
import progImage from "../assets/prog.jpg";
import Instruction from "./Instruction";
import RFIDReader from "./RFIDReader";
import { ActionFooter, Feedback, ProfessionalButton, SectionHeading, Surface } from "./StyledContainer";

const errorMessages = {
  TAG_ALREADY_PROGRAMMED: "Le tag contient déjà le bon programme. Aucun nouvel envoi n’est nécessaire.",
  INVALID_PROGRAM_ENTERED: "Le programme lu sur le tag ne correspond pas au programme attendu.",
  INVALID_TOKENPROGRAM: "Le programme du tag doit contenir au moins trois chiffres différents de zéro.",
  INVALID_TOKENSTATION: "Le numéro de station du tag doit commencer par 000 et se terminer par un chiffre non nul.",
};

const ProgStation = ({ selectedStation, solderingData, onAddToken }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("default");

  const handleTagPlaced = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setStatus("default");

    try {
      await apiHardware.sendEscape();
      await apiHardware.sendToken(solderingData.program, selectedStation);
      const response = await apiHardware.readToken(solderingData.program);
      onAddToken(response.data);
      setStatus("success");
    } catch (requestError) {
      console.error("Une erreur est survenue :", requestError);
      const code = requestError?.response?.data?.error;
      setError(errorMessages[code] ?? (code
        ? "Aucun tag n’a été détecté. Repositionnez le tag et vérifiez le programmateur."
        : "Le programmateur ne répond pas. Vérifiez sa connexion avant de réessayer."));
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "grid", gap: 2.5 }}>
      <Surface component="section" aria-labelledby="program-title">
        <SectionHeading title="Programmer le prochain tag" description="Une seule programmation sera lancée à chaque validation." />
        <Instruction
          text={status === "success" ? "Tag programmé et relu avec succès. Vous pouvez placer le tag suivant." : status === "error" ? "La programmation n’a pas pu être confirmée." : "Placez un tag sur le programmateur, puis lancez la programmation."}
          image={progImage}
          imageWidth={150}
          status={status}
        />
        {error && <Feedback severity="error" title="Programmation interrompue" sx={{ mt: 2 }}>{error}</Feedback>}
        {status === "success" && <Feedback severity="success" title="Programmation confirmée" sx={{ mt: 2 }}>Le tag a été relu et ajouté à l’historique de cette session.</Feedback>}
        <ActionFooter>
          <ProfessionalButton size="large" startIcon={<MemoryRoundedIcon />} onClick={handleTagPlaced} disabled={loading}>
            {loading ? "Programmation en cours…" : "Programmer le tag"}
          </ProfessionalButton>
        </ActionFooter>
      </Surface>
      <RFIDReader />
    </Box>
  );
};

export default ProgStation;
