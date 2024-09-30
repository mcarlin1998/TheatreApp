const express = require("express");
const scrapeTheatreShows = require("./scraper/scraper");
const cron = require("node-cron");
const app = express();
const PORT = 3000;
const showRoutes = require("./api/showRoutes"); // Import the show routes
const cors = require("cors");

//CORS in order to allow API requests from client-side
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(express.json());
app.use("/api/shows", showRoutes);

// Set up cron job to run scraper every 5 minutes
cron.schedule("*/5 * * * *", () => {
  scrapeTheatreShows();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  scrapeTheatreShows();
});
