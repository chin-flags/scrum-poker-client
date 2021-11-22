import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SocketContext from "../socket";
import useAuth from "../hooks/auth";


const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const [name, setName] = useState<string>("");
  const { socket, connectSocket } = useContext(SocketContext);

console.log('lo', location);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      auth.login(name);
      navigate("dashboard");
    } catch (error) {
      console.log("error creating user", error);
    }

    // socket.auth = { name }
    // socket.connect();
  };

  useEffect(() => {
    socket.on("users", (users) => console.log("users", users));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex  flex-col justify-center w-1/3 ">
        <form onSubmit={handleLogin}>
          <label className="text-gray-500 font-bold" htmlFor="client-name">
            Your Name
          </label>
          <input
            className="bg-gray-200 w-full py-2 px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-gray-500 font-bold" htmlFor="client-name">
            Your Name
          </label>
          <input type="checkbox" />
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

export default AuthPage;
