import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { ProfessionalButton } from "./StyledContainer";

const GeneralFunction = ({ onBackToBarcode }) => (
  <ProfessionalButton variant="secondary" startIcon={<RestartAltRoundedIcon />} onClick={onBackToBarcode}>
    Recommencer avec un autre OF
  </ProfessionalButton>
);

export default GeneralFunction;
