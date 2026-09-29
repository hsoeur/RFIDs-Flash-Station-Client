import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ActionFooter, Feedback, ProfessionalButton, SectionHeading, Surface } from "./StyledContainer";
import stationImage from "../assets/station-map.png";

const stations = [
  { id: 1, label: "Station 1", left: "79.9%", top: "84.8%" },
  { id: 2, label: "Station 2", left: "84%", top: "39.1%" },
  { id: 3, label: "Station 3", left: "10.7%", top: "38.5%" },
];

const OperatorStation = ({ onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <Surface component="section" aria-labelledby="station-title">
      <SectionHeading title="Choisir le poste de travail" description="Sélectionnez un repère sur le plan, puis confirmez votre choix." />
      <Box sx={{ position: "relative", width: "min(100%, 620px)", mx: "auto", border: "1px solid", borderColor: "divider", borderRadius: 2.5, overflow: "hidden", bgcolor: "#F8FAFC" }}>
        <Box component="img" src={stationImage} alt="Plan des trois stations de programmation" sx={{ display: "block", width: "100%", height: "auto" }} />
        {stations.map((station) => {
          const selected = selectedStation === station.label;
          return (
            <ButtonBase
              key={station.id}
              aria-label={`Sélectionner ${station.label}`}
              aria-pressed={selected}
              onClick={() => setSelectedStation(station.label)}
              sx={{ position: "absolute", left: station.left, top: station.top, transform: "translate(-50%, -50%)", width: { xs: 48, sm: 58 }, height: { xs: 48, sm: 58 }, borderRadius: "50%", bgcolor: selected ? "success.main" : "primary.main", color: "white", border: "3px solid white", boxShadow: "0 3px 12px rgba(17, 24, 39, 0.28)", fontWeight: 800, fontSize: { xs: "1rem", sm: "1.2rem" }, "&:hover": { bgcolor: selected ? "success.dark" : "primary.dark" }, "&:focus-visible": { outline: "4px solid #9AAAF0", outlineOffset: 3 } }}
            >
              {selected ? <CheckRoundedIcon /> : station.id}
            </ButtonBase>
          );
        })}
      </Box>
      {selectedStation ? (
        <Feedback severity="info" title={`${selectedStation} sélectionnée`} sx={{ mt: 2.5 }}>Vérifiez le numéro du poste avant de continuer.</Feedback>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>Aucun poste sélectionné.</Typography>
      )}
      <ActionFooter>
        <ProfessionalButton onClick={() => onStationSelect(selectedStation)} disabled={!selectedStation}>Confirmer le poste</ProfessionalButton>
      </ActionFooter>
    </Surface>
  );
};

export default OperatorStation;
