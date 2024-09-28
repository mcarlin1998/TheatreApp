// api/routes/showRoutes.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// GET route to fetch theatre shows data
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/theatre-shows.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading theatre shows data:", err);
      return res.status(500).json({ message: "Error reading data" });
    }

    // Parse the JSON data and send it as the response
    try {
      const theatreShows = JSON.parse(data);
      console.log(theatreShows);

      const reducedData = theatreShows.map((show) => ({
        name: show.title,
        image: show.image,
        see_tickets_url_infos: show.see_tickets_url_infos,
      }));

      res.json(reducedData);
    } catch (parseError) {
      console.error("Error parsing theatre shows data:", parseError);
      res.status(500).json({ message: "Error parsing data" });
    }
  });
});

module.exports = router;
