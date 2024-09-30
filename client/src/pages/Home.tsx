import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard/ShowCard";
import { ShowData } from "../types";

export default function Home() {
  const [showData, setShowData] = useState<ShowData[] | null>(null);

  async function getShowData() {
    try {
      const response = await fetch("http://localhost:3000/api/shows/");
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setShowData(data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  }

  useEffect(() => {
    getShowData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Today's Deals</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {showData
          ? showData.map((showInfo: ShowData, index: number) => {
              return <ShowCard {...showInfo} key={index} />;
            })
          : null}
      </div>
    </div>
  );
}
