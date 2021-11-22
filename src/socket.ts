import { createContext } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "./config";

const socket = io(SOCKET_URL, { autoConnect: false });
const connectSocket = () => socket.connect();

export const socketObj = {
  socket,
  connectSocket,
};

socket.onAny((event, ...args) => console.log(event, args));
const SocketContext = createContext(socketObj);

export default SocketContext;
