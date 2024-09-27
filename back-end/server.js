const express = require("express");
const scrapeTheatreShows = require("./scraper/scraper");
const cron = require("node-cron");
const app = express();
const PORT = 3000;
const showRoutes = require("./api/showRoutes"); // Import the show routes

// Set up routes
app.use(express.json());
app.use("/api/shows", showRoutes);

// Set up cron job to run scraper every 5 minutes
cron.schedule("*/5 * * * *", () => {
  scrapeTheatreShows();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  scrapeTheatreShows();
});
