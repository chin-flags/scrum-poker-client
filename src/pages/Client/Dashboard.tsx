import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../../socket";

type Session = {
  _id: string;
  name: string;
  admin: string;
  type: string;
  players?: [string];
  stories?: [string];
  status: string;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");

  const handleGetSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:3001/session/${code}`);
    const session: Session = response.data;
    if (session) {
      navigate(`client/dashboard/${session._id}`);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex  flex-col justify-center w-1/3 mt-5 ">
        <form onSubmit={handleGetSession}>
          <label className="text-gray-500 font-bold" htmlFor="client-name">
            Please put your join code
          </label>
          <input
            className="bg-gray-200 w-full py-2 px-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 text-white font-bold hover:bg-purple-400 py-2 px-4 mt-2 w-full rounded"
          >
            GO!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
