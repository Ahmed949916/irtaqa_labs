"use client";

import React, { useMemo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Example: Hardcoded relationship
const RELATIONSHIP = "Sister";

// Sample case data
const CASES = [
  {
    dateNum: "27",
    dateStr: "February 2020",
    caseId: "19403-22-02",
    tests: [
      { name: "Protein C", status: "Downloads", pdfUrl: "/pdfs/protein-c.pdf" },
      {
        name: "Free Protein S",
        status: "Downloads",
        pdfUrl: "/pdfs/free-protein-s.pdf",
      },
      {
        name: "Anti-Thrombin",
        status: "Downloads",
        pdfUrl: "/pdfs/anti-thrombin.pdf",
      },
      {
        name: "Factor V Leiden Screening (Activated Protein C Resistance)",
        status: "Downloads",
        pdfUrl: "/pdfs/factor-v-leiden.pdf",
      },
    ],
  },
  {
    dateNum: "21",
    dateStr: "February 2020",
    caseId: "19402-22-02",
    tests: [
      { name: "Blood Sugar", status: "Downloads", pdfUrl: "/pdfs/blood-sugar.pdf" },
      { name: "Urea", status: "Downloads", pdfUrl: "/pdfs/urea.pdf" },
    ],
  },
  {
    dateNum: "23",
    dateStr: "February 2020",
    caseId: "46901-22-02",
    tests: [{ name: "Thyroid Profile", status: "Downloads", pdfUrl: "/pdfs/thyroid.pdf" }],
  },
  {
    dateNum: "23",
    dateStr: "February 2020",
    caseId: "19401-22-02",
    tests: [
      { name: "CBC", status: "Downloads", pdfUrl: "/pdfs/cbc.pdf" },
      { name: "Lipid Profile", status: "Downloads", pdfUrl: "/pdfs/lipid.pdf" },
    ],
  },
];

// Helper function to parse "dateNum" and "dateStr" into a JS Date object
// dateNum = "27", dateStr = "February 2020" => "February 27, 2020"
function parseCaseDate(dateNum: string, dateStr: string): Date {
  const [monthName, year] = dateStr.split(" "); // "February", "2020"
  const day = parseInt(dateNum, 10);
  return new Date(`${monthName} ${day}, ${year}`);
}

const Cases = () => {
  const handleBack = () => {
    // e.g. router.back() or router.push("/previous")
    console.log("Back arrow clicked");
  };

  // Sort cases by date (most recent first) using useMemo so it doesn't recalc on every render
  const sortedCases = useMemo(() => {
    // Create a copy so we don't mutate the original
    const copy = [...CASES];
    copy.sort((a, b) => {
      const dateA = parseCaseDate(a.dateNum, a.dateStr);
      const dateB = parseCaseDate(b.dateNum, b.dateStr);
      // Compare descending (most recent first)
      return dateB.getTime() - dateA.getTime();
    });
    return copy;
  }, []);

  // Handler to open PDF in a new tab
  const handlePdfClick = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: "#006241" }}>
        <Toolbar>
       
          <Typography variant="h6" component="div">
            Cases
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Relationship Title */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#006241" }}>
          {RELATIONSHIP}
        </Typography>
      </Box>

      {/* Cases List as Accordions */}
      <Box sx={{ px: 2, pb: 4 }}>
        {sortedCases.map((caseItem, index) => (
          <Accordion
            key={index}
            disableGutters
            sx={{
              mb: 2,
              borderLeft: "4px solid #006241",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              "&:before": { display: "none" }, // Remove default Accordion divider line
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/* Top row with date + case ID */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ textAlign: "center", mr: 2, width: "60px" }}>
                  <Typography variant="h6" sx={{ lineHeight: 1 }}>
                    {caseItem.dateNum}
                  </Typography>
                  <Typography variant="caption">
                    {caseItem.dateStr}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {caseItem.caseId}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Divider />

              {/* Tests List */}
              <List dense disablePadding>
                {caseItem.tests.map((test, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    <ListItemText
                      primary={test.name}
                      secondary={test.status}
                      sx={{ mr: 2 }}
                    />
                    {/* PDF Icon click -> open PDF */}
                    <PictureAsPdfIcon
                      sx={{ color: "#E65100", cursor: "pointer" }}
                      onClick={() => handlePdfClick(test.pdfUrl)}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Cases;
