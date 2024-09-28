import { ShowData } from "../../types";

export default function ShowCard(showInfo: ShowData) {
  return (
    <>
      <img src={showInfo.image} height={50} width={50} />
      <h2>{showInfo.name}</h2>
      <h3>About the Show</h3>
      <button>Buy Now</button>
    </>
  );
}
