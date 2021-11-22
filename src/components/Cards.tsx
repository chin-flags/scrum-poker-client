import { useState, useEffect, useContext } from "react";
import SocketContext from "../socket";

const Cards = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);

  const handleCardOnClick = (number: number) => {
    socket.emit("CARD_PICK", number);
  };

  return (
    <div className="flex flex-1 flex-row flex-wrap p-10 h-auto">
      {[1, 2, 3, 5, 8, 13, 21, 34].map((num) => (
        <div
          key={num}
          onClick={() => handleCardOnClick(num)}
          className="flex w-40 h-60 rounded-lg mr-4 mb-4 justify-center items-center cursor-pointer bg-gray-700"
        >
          <h1 className="text-white text-8xl ">{num}</h1>
        </div>
      ))}
    </div>
  );
};

export default Cards;
