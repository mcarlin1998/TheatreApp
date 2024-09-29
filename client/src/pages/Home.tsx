import { error } from "console";
import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard/ShowCard";
import { ShowData } from "../types";

export default function Home() {
  const [showData, setShowData] = useState<ShowData[] | null>(null);
  const [showTicketLink, setShowTicketLink] = useState<String | null>(null);

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

  console.log(showData);
  return (
    <>
      {showData
        ? showData.map((showInfo: ShowData, index: number) => {
            return <ShowCard {...showInfo} />;
          })
        : null}
    </>
  );
}
