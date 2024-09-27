const axios = require("axios");
const fs = require("fs");
const path = require("path");

const scrapeTheatreShows = async () => {
  try {
    // Fetch data from the API
    console.log("hit");
    const response = await axios.get(
      "https://officiallondontheatre.com/wp-json/shows/all-open"
    );
    const theatreShows = response.data;

    // Define the path to save the file
    const filePath = path.join(__dirname, "../data/theatre-shows.json");

    // Save the data to a local JSON file
    fs.writeFileSync(filePath, JSON.stringify(theatreShows, null, 2));

    console.log("Theatre shows data saved successfully!");
  } catch (error) {
    console.error("Error fetching theatre shows data:", error);
  }
};

// Export the scraper function
module.exports = scrapeTheatreShows;
