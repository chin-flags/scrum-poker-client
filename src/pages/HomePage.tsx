import { Link } from "react-router-dom";
import useAuth from "../hooks/auth";

const HomePage = () => {
  const auth = useAuth();
  return (
    <div className="flex flex-1 w-full p-10">
      <Link to={auth.user ? "client/dashboard" : "client"}>Client</Link>
      <Link to={auth.user ? "admin/dashboard" : "admin"}>Admin</Link>
    </div>
  );
};

export default HomePage;
