import { ShowData } from "../../types";

export default function ShowCard(showInfo: ShowData) {
  const isSoldOut = showInfo.bookingLink === "SOLD OUT";

  return (
    <div
      className={`border rounded-lg shadow-lg flex flex-col justify-between ${
        isSoldOut ? "bg-gray-300" : "bg-white"
      } h-[350px] w-[350px]`}
    >
      <div className="flex-1">
        <img
          src={showInfo.image}
          alt={showInfo.name}
          className={`w-full h-full object-cover rounded-t-md ${
            isSoldOut ? "opacity-25" : ""
          }`}
        />
      </div>

      <div className="p-3">
        <h1
          className={`text-xl font-bold mb-1 text-center ${
            isSoldOut ? "text-gray-500 opacity-50" : ""
          }`}
        >
          {showInfo.name}
        </h1>
        <h3
          className={`text-md font-medium mb-1 text-center ${
            isSoldOut ? "text-gray-500 opacity-50" : ""
          }`}
        >
          About the Show
        </h3>
      </div>

      <div className="">
        {isSoldOut ? (
          <h3 className="text-center font-bold text-md pb-2 text-gray-500 opacity-50">
            SOLD OUT
          </h3>
        ) : (
          <a
            href={`${showInfo.bookingLink}`}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 rounded-b-md hover:from-red-500 hover:to-orange-500 transition duration-300 text-md h-full w-full flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </a>
        )}
      </div>
    </div>
  );
}
