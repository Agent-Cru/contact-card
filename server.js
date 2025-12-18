const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Absolute path to the vCard file
const vcardPath = path.join(__dirname, "AgentCru.vcf");

// Health check / root
app.get("/", (_req, res) => {
  res.send("Agent Cru vCard service is running.");
});

// vCard route
app.get("/AgentCru.vcf", (_req, res) => {
  res.setHeader("Content-Type", 'text/vcard; charset=utf-8');
  res.setHeader("Content-Disposition", 'attachment; filename="AgentCru.vcf"');
  res.sendFile(vcardPath);
});

// Fallback
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
