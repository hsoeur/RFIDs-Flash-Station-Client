import { Box, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const statusConfig = {
  default: { icon: <InfoOutlinedIcon />, color: "primary.main", background: "primary.light" },
  success: { icon: <CheckCircleOutlineRoundedIcon />, color: "success.main", background: "success.light" },
  error: { icon: <ErrorOutlineRoundedIcon />, color: "error.main", background: "error.light" },
};

const Instruction = ({ text, image, imageWidth = 160, imageHeight = "auto", status = "default" }) => {
  const config = statusConfig[status] ?? statusConfig.default;
  return (
    <Box role="status" aria-live="polite" sx={{ display: "grid", gridTemplateColumns: image ? { xs: "1fr", sm: "minmax(0, 1fr) auto" } : "1fr", gap: 2, alignItems: "center", p: 2, bgcolor: config.background, borderRadius: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
        <Box aria-hidden="true" sx={{ color: config.color, display: "flex", mt: 0.1 }}>{config.icon}</Box>
        <Typography sx={{ fontWeight: 650, lineHeight: 1.5 }}>{text}</Typography>
      </Box>
      {image && <Box component="img" src={image} alt="Positionnement du tag sur le programmateur" sx={{ width: imageWidth, height: imageHeight, maxWidth: "100%", maxHeight: 170, objectFit: "contain", justifySelf: "center", borderRadius: 2 }} />}
    </Box>
  );
};

export default Instruction;
