import React from "react";
import { Box, Typography } from "@mui/material";

const SequenceInformation = ({ ManufacturingOrderUid, Product, Program, Station, Side }) => {
  const InfoRow = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #e8e8e8",
        '&:last-child': {
          borderBottom: 'none',
        }
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          color: "#6b7280",
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          color: "#1f2937",
          fontSize: "0.95rem",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        marginTop: 0,
        marginBottom: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 2,
            paddingBottom: 2,
            borderBottom: "2px solid #4a6fa5",
          }}
        >
          Informations de production
        </Typography>
        <Box>
          <InfoRow label="Order UID" value={ManufacturingOrderUid} />
          <InfoRow label="Produit" value={Product} />
          <InfoRow label="Face" value={Side} />
          <InfoRow label="Programme" value={Program} />
          <InfoRow label="Station" value={Station} />
        </Box>
      </Box>
    </Box>
  );
};

export default SequenceInformation;
