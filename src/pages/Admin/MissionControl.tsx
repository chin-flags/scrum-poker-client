import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const MissionControl = () => {
  const { sessionId } = useParams();

  const [description, setName] = useState<string>("");
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleCreateStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3001/story", {
      description,
      sessionId,
    });

    const story = response.data;

   // setSessions([...sessions, session]);
  };

  const handleGetSessions = async (userId: string) => {
    const sessions = await axios.get(
      `http://localhost:3001/sessions/${userId}`
    );
    setSessions(sessions.data);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("poker-user")!);
   // setCurrentUser(localUser);
    handleGetSessions(localUser.userId);
  }, []);

  return (
    <div className="container mx-auto">
      <h1>{sessionId}</h1>
      <div className="flex  flex-col justify-center w-1/3 mt-5 ">
        <form onSubmit={handleCreateStory}>
          <label className="text-gray-500 font-bold" htmlFor="client-name">
            Story
          </label>
          <input
            className="bg-gray-200 w-full py-2 px-4"
            value={description}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 text-white font-bold hover:bg-purple-400 py-2 px-4 mt-2 w-full rounded"
          >
            Let them play!
          </button>
        </form>
      </div>
    </div>
  );
};

export default MissionControl;
