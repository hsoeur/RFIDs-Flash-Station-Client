import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton } from "@mui/material";
import TokenIcon from "@mui/icons-material/Token"; // Import de l'icône

const LogTokens = ({ tokens }) => {
  if (!tokens || tokens.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          marginTop: 3,
          textAlign: "center",
          color: "#6b7280",
          fontStyle: "italic",
        }}
      >
        Aucun token programmé pour le moment.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        marginTop: 3,
        padding: 2,
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <TokenIcon sx={{ color: "#4caf50", marginRight: 1 }} fontSize="large" />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#374151",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          Liste des Tokens Programmés :
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#374151" }}>Program</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#374151" }}>Station</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: "#f9fafb" } }}>
                <TableCell>{token.tokenProgram}</TableCell>
                <TableCell>{token.tokenStation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LogTokens;
