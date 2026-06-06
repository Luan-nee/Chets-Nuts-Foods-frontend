import { io } from "socket.io-client";
import { useAuth } from "./context/AuthContext"
import { URL } from "./const";

const { auth } = useAuth()

export const getSocket = io(URL, {
  autoConnect: false,
  auth: {
    token: auth.token,
  },
});
