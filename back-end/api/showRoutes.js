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
      console.log(theatreShows[0].see_tickets_url_infos);

      const reducedData = theatreShows.map((show) => {
        const seeTicketsInfo = show.see_tickets_url_infos;

        if (!seeTicketsInfo.length) {
          return {
            name: show.title,
            image: show.image,
            bookingLink: "SOLD OUT",
          };
        }

        const tktsonlineLink = seeTicketsInfo.find((info) =>
          info.url.includes("tktsonline.seetickets.com")
        );

        const officialLondonLink = seeTicketsInfo.find((info) =>
          info.url.includes("officiallondontheatre.seetickets.com")
        );

        return {
          name: show.title,
          image: show.image,
          bookingLink:
            tktsonlineLink?.url || officialLondonLink?.url || "SOLD OUT",
        };
      });

      res.json(reducedData);
    } catch (parseError) {
      console.error("Error parsing theatre shows data:", parseError);
      res.status(500).json({ message: "Error parsing data" });
    }
  });
});

module.exports = router;
