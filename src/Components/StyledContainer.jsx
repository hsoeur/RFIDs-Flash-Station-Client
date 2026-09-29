import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import amphitechLogo from "../assets/amphitech-logo.png";

const toneConfig = {
  neutral: { foreground: "#475467", background: "#F2F4F7", dot: "#98A2B3" },
  info: { foreground: "#24377A", background: "#EEF1FF", dot: "#3156B7" },
  success: { foreground: "#0E6245", background: "#EAF7F1", dot: "#16805C" },
  warning: { foreground: "#8A470C", background: "#FFF5E9", dot: "#C96A12" },
  error: { foreground: "#B42318", background: "#FFF0EF", dot: "#F0443E" },
};

export const StatusBadge = ({ children, tone = "neutral" }) => {
  const config = toneConfig[tone] ?? toneConfig.neutral;
  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, minHeight: 30, px: 1.25, borderRadius: "999px", color: config.foreground, bgcolor: config.background, fontSize: "0.78rem", lineHeight: 1, fontWeight: 700, whiteSpace: "nowrap" }}>
      <Box component="span" aria-hidden="true" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: config.dot }} />
      {children}
    </Box>
  );
};

export const ApplicationShell = ({ children, status = "Poste prêt", statusTone = "success" }) => (
  <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
    <Box component="header" sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}>
      <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto", px: { xs: 2, sm: 3, lg: 5 }, minHeight: { xs: 64, sm: 72 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, minWidth: 0 }}>
          <Box
            component="img"
            src={amphitechLogo}
            alt="Amphitech"
            sx={{
              display: "block",
              width: { xs: 142, sm: 188 },
              height: { xs: 40, sm: 46 },
              objectFit: "contain",
              objectPosition: "left center",
              flex: "0 0 auto",
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", md: "block" }, pl: 1.5, borderLeft: "1px solid", borderColor: "divider", whiteSpace: "nowrap" }}
          >
            Programmation RFID
          </Typography>
        </Box>
        <StatusBadge tone={statusTone}>{status}</StatusBadge>
      </Box>
    </Box>
    <Box component="main" sx={{ width: "100%", maxWidth: 1600, mx: "auto", px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 2.5, sm: 3.5, lg: 4 } }}>
      {children}
    </Box>
  </Box>
);

export const PageTitle = ({ eyebrow, title, description }) => (
  <Box sx={{ maxWidth: 860, mb: { xs: 2.5, sm: 3.5 } }}>
    {eyebrow && <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 800, mb: 0.75 }}>{eyebrow}</Typography>}
    <Typography component="h1" variant="h1">{title}</Typography>
    {description && <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>{description}</Typography>}
  </Box>
);

export const ContextBar = ({ items }) => (
  <Box component="section" aria-label="Contexte de production" sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: `repeat(${Math.min(items.length, 5)}, minmax(0, 1fr))` }, mb: { xs: 2.5, sm: 3 }, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: 3, overflow: "hidden", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.03)" }}>
    {items.map(({ label, value }, index) => (
      <Box key={label} sx={{ minWidth: 0, px: { xs: 1.5, sm: 2 }, py: 1.5, borderRight: { xs: index % 2 === 0 ? "1px solid" : "none", md: index < items.length - 1 ? "1px solid" : "none" }, borderBottom: { xs: index < items.length - (items.length % 2 || 2) ? "1px solid" : "none", md: "none" }, borderColor: "divider" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>{label}</Typography>
        <Typography className="tabular-number" sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>{value || "—"}</Typography>
      </Box>
    ))}
  </Box>
);

export const Surface = ({ children, component = "section", sx, ...props }) => (
  <Box component={component} sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: { xs: 2.5, sm: 3 }, boxShadow: "0 6px 20px rgba(16, 24, 40, 0.055)", p: { xs: 2, sm: 3 }, ...sx }} {...props}>{children}</Box>
);

export const SectionHeading = ({ title, description, action }) => (
  <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, mb: 2.5 }}>
    <Box>
      <Typography component="h2" variant="h2">{title}</Typography>
      {description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography>}
    </Box>
    {action}
  </Box>
);

export const ActionFooter = ({ children }) => (
  <Box sx={{ display: "flex", flexDirection: { xs: "column-reverse", sm: "row" }, justifyContent: "flex-end", gap: 1.5, mt: 3, pt: 2.5, borderTop: "1px solid", borderColor: "divider", "& > *": { width: { xs: "100%", sm: "auto" } } }}>{children}</Box>
);

const feedbackIcon = {
  success: <CheckCircleOutlineRoundedIcon fontSize="inherit" />,
  error: <ErrorOutlineRoundedIcon fontSize="inherit" />,
  warning: <WarningAmberRoundedIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
};

export const Feedback = ({ severity = "info", title, children, sx }) => (
  <Alert severity={severity} icon={feedbackIcon[severity]} role={severity === "error" ? "alert" : "status"} sx={{ alignItems: "flex-start", border: "1px solid", borderColor: `${severity}.main`, bgcolor: `${severity}.light`, color: "text.primary", borderRadius: 2.5, "& .MuiAlert-icon": { color: `${severity}.main`, fontSize: "1.35rem", mt: 0.15 }, ...sx }}>
    {title && <Typography sx={{ fontWeight: 700, mb: 0.25 }}>{title}</Typography>}
    <Typography variant="body2" component="div">{children}</Typography>
  </Alert>
);

export const LoadingState = ({ text = "Chargement…", minHeight = 260 }) => (
  <Box role="status" aria-live="polite" sx={{ minHeight, display: "grid", placeItems: "center", textAlign: "center", p: 3 }}>
    <Box>
      <CircularProgress size={32} thickness={4} />
      <Typography sx={{ mt: 1.5, fontWeight: 600 }}>{text}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Merci de patienter quelques instants.</Typography>
    </Box>
  </Box>
);

export const EmptyState = ({ children, text = "Aucune donnée disponible" }) => (
  <Box sx={{ textAlign: "center", px: 2, py: 5, color: "text.secondary" }}>{children || <Typography variant="body2">{text}</Typography>}</Box>
);

export const Metric = ({ label, value }) => (
  <Box sx={{ minWidth: 0, p: 1.75, bgcolor: "#F8FAFC", borderRadius: 2 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography className="tabular-number" sx={{ mt: 0.5, fontWeight: 800, overflowWrap: "anywhere" }}>{value ?? "—"}</Typography>
  </Box>
);

export const ProfessionalButton = ({ children, variant = "primary", startIcon, endIcon, fullWidth = false, size = "medium", ...props }) => {
  const muiVariant = variant === "secondary" ? "outlined" : "contained";
  const color = ["success", "warning", "error"].includes(variant) ? variant : variant === "danger" ? "error" : "primary";
  return <Button variant={muiVariant} color={color} startIcon={startIcon} endIcon={endIcon} fullWidth={fullWidth} size={size} {...props}>{children}</Button>;
};

export const StatBadge = ({ children, color = "text.secondary", ...props }) => <Typography variant="body2" color={color} sx={{ fontWeight: 700 }} {...props}>{children}</Typography>;
export const HeaderActions = ({ children, ...props }) => <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }} {...props}>{children}</Box>;

const StyledContainer = ({ children, title, subtitle, loading = false, error = null, loadingText = "Chargement…", sx, ...props }) => {
  if (loading) return <LoadingState text={loadingText} />;
  if (error) return <Feedback severity="error">{error}</Feedback>;
  return <Surface sx={sx} {...props}>{(title || subtitle) && <SectionHeading title={title} description={subtitle} />}{children}</Surface>;
};

export default StyledContainer;
