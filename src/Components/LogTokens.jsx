import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { EmptyState, SectionHeading, StatusBadge, Surface } from "./StyledContainer";

const LogTokens = ({ tokens }) => (
  <Surface aria-labelledby="token-history-title" sx={{ p: { xs: 0, sm: 0 }, overflow: "hidden" }}>
    <Box sx={{ p: { xs: 2, sm: 2.5 }, pb: 1 }}>
      <SectionHeading
        title="Tags programmés"
        description="Historique de la session en cours"
        action={<StatusBadge tone={tokens?.length ? "success" : "neutral"}>{tokens?.length ?? 0} traité{tokens?.length === 1 ? "" : "s"}</StatusBadge>}
      />
    </Box>
    {!tokens || tokens.length === 0 ? (
      <EmptyState>
        <CheckCircleOutlineRoundedIcon sx={{ fontSize: 30, color: "#98A2B3", mb: 1 }} />
        <Typography variant="body2">Les tags programmés apparaîtront ici.</Typography>
      </EmptyState>
    ) : (
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="small" aria-label="Tags programmés pendant cette session">
          <TableHead><TableRow><TableCell>Programme</TableCell><TableCell>Poste</TableCell><TableCell align="right">État</TableCell></TableRow></TableHead>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={`${token.tokenProgram}-${token.tokenStation}-${index}`}>
                <TableCell className="tabular-number" sx={{ fontWeight: 700 }}>{token.tokenProgram}</TableCell>
                <TableCell className="tabular-number">{token.tokenStation}</TableCell>
                <TableCell align="right"><StatusBadge tone="success">Programmé</StatusBadge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </Surface>
);

export default LogTokens;
