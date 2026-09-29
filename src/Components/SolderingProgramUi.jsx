import { useState } from "react";
import { Box, Typography } from "@mui/material";
import BarcodeManufacturing from "./BarcodeManufacturing";
import GeneralFunction from "./GeneralFunction";
import LogTokens from "./LogTokens";
import OperatorStation from "./OperatorStation";
import ProgStation from "./ProgStation";
import SequenceInformation from "./SequenceInformation";
import { ApplicationShell, PageTitle, StatusBadge } from "./StyledContainer";

const SolderingProgramUi = () => {
  const [barcodeText, setBarcodeText] = useState("");
  const [solderingData, setSolderingData] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [readTokenResponses, setReadTokenResponses] = useState([]);

  const handleStationSelect = (station) => {
    if (station === "Station 1") setSelectedStation("0001");
    if (station === "Station 2") setSelectedStation("0002");
    if (station === "Station 3") setSelectedStation("0003");
  };

  const handleBackToBarcode = () => {
    setSolderingData(null);
    setSelectedStation(null);
    setBarcodeText("");
    setReadTokenResponses([]);
  };

  const step = !solderingData ? 1 : !selectedStation ? 2 : 3;
  const pageCopy = step === 1
    ? { title: "Quel ordre de fabrication souhaitez-vous préparer ?", description: "Scannez l’OF pour charger le programme de soudure actif." }
    : step === 2
      ? { title: "Sur quel poste travaillez-vous ?", description: "Le poste choisi sera enregistré dans chaque tag programmé." }
      : { title: "Prêt à programmer le prochain tag ?", description: "Placez le tag, lancez la programmation et contrôlez le résultat." };
  const shellStatus = step === 1 ? "En attente d’un OF" : step === 2 ? "OF chargé" : "Poste actif";
  const shellTone = step === 1 ? "neutral" : step === 2 ? "info" : "success";

  return (
    <ApplicationShell status={shellStatus} statusTone={shellTone}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1 }}>
        <StatusBadge tone="info">Étape {step} sur 3</StatusBadge>
        {step > 1 && <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>OF → Poste → Programmation</Typography>}
      </Box>
      <PageTitle eyebrow="Production · Brasage sélectif" title={pageCopy.title} description={pageCopy.description} />
      <SequenceInformation
        ManufacturingOrderUid={barcodeText || "En attente"}
        Product={solderingData?.productUid || "—"}
        Program={solderingData?.program || "—"}
        Station={selectedStation || "—"}
        Side={solderingData?.side || "—"}
      />

      {step === 1 && (
        <Box sx={{ maxWidth: 820, mx: "auto" }}>
          <BarcodeManufacturing onResponse={setSolderingData} onBarcodeChange={setBarcodeText} />
        </Box>
      )}

      {step === 2 && (
        <Box sx={{ maxWidth: 920, mx: "auto" }}>
          <OperatorStation onStationSelect={handleStationSelect} />
        </Box>
      )}

      {step === 3 && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", xl: "minmax(0, 1.65fr) minmax(320px, 0.75fr)" }, alignItems: "start", gap: 3 }}>
          <ProgStation selectedStation={selectedStation} solderingData={solderingData} onAddToken={(token) => setReadTokenResponses((current) => [...current, token])} />
          <LogTokens tokens={readTokenResponses} />
        </Box>
      )}

      {step > 1 && (
        <Box sx={{ display: "flex", justifyContent: { xs: "stretch", sm: "flex-start" }, mt: 3, "& > *": { width: { xs: "100%", sm: "auto" } } }}>
          <GeneralFunction onBackToBarcode={handleBackToBarcode} />
        </Box>
      )}
    </ApplicationShell>
  );
};

export default SolderingProgramUi;
