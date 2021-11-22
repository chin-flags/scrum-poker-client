import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Session } from "../../types";

const Dashboard = () => {

  const [name, setName] = useState<string>("");
  const [currentUser, setCurrentUser] =
    useState<{ userId: string; name: string }>();
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleCreateSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3001/session", {
      name,
      admin: currentUser?.userId,
    });

    const session = response.data;

    setSessions([...sessions, session]);
  };

  const handleGetSessions = async (userId: string) => {
    const sessions = await axios.get(
      `http://localhost:3001/sessions/${userId}`
    );
    setSessions(sessions.data);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("poker-user")!);
    setCurrentUser(localUser);
    handleGetSessions(localUser.userId);
  }, []);

  return (
    <div className="container mx-auto">
      <ul className="flex  flex-col justify-center w-1/3 ">
        {sessions &&
          sessions.map((session) => (
            <li>
              <Link to={`/admin/dashboard/${session._id}`}>
                <div
                  key={session._id}
                  className="flex flex-1 flex-row cursor-pointer bg-green-500 text-white font-bold hover:bg-green-400 mb-2 p-2 rounded-md "
                >
                  <h2 className="mr-5">{session.name}</h2>
                  <h2>{session.status}</h2>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <div className="flex  flex-col justify-center w-1/3 mt-5 ">
        <form onSubmit={handleCreateSession}>
          <label className="text-gray-500 font-bold" htmlFor="client-name">
            New Session name
          </label>
          <input
            className="bg-gray-200 w-full py-2 px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
