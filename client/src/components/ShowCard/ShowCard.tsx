import { ShowData } from "../../types";

export default function ShowCard(showInfo: ShowData) {
  return (
    <div
      className={`border rounded-lg p-2 shadow-lg flex flex-col justify-between ${
        showInfo.bookingLink === "SOLD OUT" ? "bg-gray-300" : "bg-white"
      } h-[305px] w-[350px]`} // Updated height and width
    >
      <img
        src={showInfo.image}
        alt={showInfo.name}
        className="w-full h-[70%] object-cover rounded-md" // Full width, height is 70% of card
      />
      <h2 className="text-sm font-semibold mb-1 text-center">
        {showInfo.name}
      </h2>
      <h3 className="text-xs font-medium mb-1 text-center">About the Show</h3>
      {showInfo.bookingLink !== "SOLD OUT" ? (
        <a
          href={`${showInfo.bookingLink}`}
          className="bg-blue-500 text-white text-center py-1 px-2 rounded-md hover:bg-blue-600 transition duration-300 text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now
        </a>
      ) : (
        <h3 className="text-center font-bold text-xs">SOLD OUT</h3>
      )}
    </div>
  );
}
