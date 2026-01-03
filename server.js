const express = require("express");

const app = express();
app.use(express.static(__dirname));

app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json([]);
  }

  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

  try {
    const response = await fetch(url); // native fetch (Node v24)
    const data = await response.json();
    res.json(data.query.search);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(3000, () => {
  console.log("quri running at http://localhost:3000");
});
