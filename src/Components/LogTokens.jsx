import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import TokenIcon from "@mui/icons-material/Token";
import { EmptyState } from "./StyledContainer";

const LogTokens = ({ tokens }) => {
  if (!tokens || tokens.length === 0) {
    return (
      <EmptyState text="Aucun token programmé pour le moment." />
    );
  }

  return (
    <Box
      sx={{
        marginTop: 3,
        padding: 3,
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <TokenIcon sx={{ color: "#2d7a4f", marginRight: 1 }} fontSize="large" />
        <Typography
          variant="h6"
          sx={{
            color: "#1a1a1a",
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Liste des Tokens Programmés
        </Typography>
      </Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: "8px", 
          overflow: "hidden",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ fontWeight: 600, color: "#1a1a1a", fontSize: "0.875rem" }}>
                Program
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#1a1a1a", fontSize: "0.875rem" }}>
                Station
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow 
                key={index} 
                sx={{ 
                  '&:nth-of-type(odd)': { backgroundColor: "#ffffff" },
                  '&:nth-of-type(even)': { backgroundColor: "#f9fafb" },
                  '&:hover': { backgroundColor: "#f0f4f8" },
                  transition: "background-color 0.2s ease",
                }}
              >
                <TableCell sx={{ color: "#1a1a1a", fontSize: "0.875rem" }}>
                  {token.tokenProgram}
                </TableCell>
                <TableCell sx={{ color: "#1a1a1a", fontSize: "0.875rem" }}>
                  {token.tokenStation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LogTokens;
