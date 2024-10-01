import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard/ShowCard";
import { ShowData } from "../types";

export default function Home() {
  const [showData, setShowData] = useState<ShowData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getShowData() {
    //Fetch request to express server
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/apsi/shows/");
      if (!response || !response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      //State handling
      setShowData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //useEffect call on initial render - interval also set in line with CRON which runs every 5 minutes.
    getShowData();
    const intervalId = setInterval(() => {
      getShowData();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Today's Deals</h1>
      {loading && <p className="text-lg">Loading...</p>}{" "}
      {/* Display loading message */}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message */}
      <div className="grid gap-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {/* Maps showData into a JSX component to render */}
        {showData
          ? showData.map((showInfo: ShowData, index: number) => {
              return <ShowCard {...showInfo} key={index} />;
            })
          : null}
      </div>
    </div>
  );
}
