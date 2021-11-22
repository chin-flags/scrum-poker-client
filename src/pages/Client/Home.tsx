import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const createLocaluser = (name: string, userId: string) => {
    const user: { userId: string; name: string } = {
      userId,
      name,
    };
    localStorage.setItem("poker-user", JSON.stringify(user));
    return user;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("poker-userk")!);
    if (currentUser) {
      //login
      navigate("dashboard");
    }

    try {
      const response = await axios.post("http://localhost:3001/login", {
        name,
      });
      const { userId } = response.data;
      createLocaluser(name, userId);

      navigate("dashboard");
    } catch (error) {
      console.log("error creating user", error);
    }

    // socket.auth = { name }
    // socket.connect();
  };

  useEffect(() => {

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

export default Home;
