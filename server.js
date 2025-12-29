const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Root - simple status
app.get("/", (req, res) => {
  res.send("Agent Cru vCard service is running.");
});

// Dynamic vCard route: /SomeName.vcf
app.get("/:file", (req, res) => {
  const file = req.params.file;

  // Only allow .vcf files
  if (!file.toLowerCase().endsWith(".vcf")) {
    return res.status(404).send("Not found");
  }

  // Prevent directory traversal: strip any path pieces
  const safeFile = path.basename(file);

  const vcardPath = path.join(__dirname, safeFile);

  res.setHeader("Content-Type", "text/vcard; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${safeFile}"`
  );

  res.sendFile(vcardPath, (err) => {
    if (err) {
      console.error("Error sending vCard:", err);
      if (!res.headersSent) {
        res.status(err.statusCode || 404).send("vCard not found");
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
