import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Import de l'icône

const SequenceInformation = ({ ManufacturingOrderUid, Product, Program, Station, Side }) => {
  return (
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#f9fafb",
          border: "1px solid #d1d5db",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <InfoIcon sx={{ color: "#4caf50", marginRight: 1 }} fontSize="large" />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                textAlign: "center",
                color: "#374151",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Informations
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              color: "#4b5563",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Order UID :</span>
              {ManufacturingOrderUid}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Produit :</span>
              {Product}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Face :</span>
            {Side}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1rem",
            }}
          >
              <span style={{ fontWeight: "bold" }}>Programme :</span>
              {Program}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Station :</span>
              {Station}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SequenceInformation;
