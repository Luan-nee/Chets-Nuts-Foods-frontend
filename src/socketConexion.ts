import { io } from "socket.io-client";
import { URL } from "./const";


export const getSocket = io(URL, {
  autoConnect: false,
  auth: {
    token:"qqqqqqqqqqqqqqqqqq",
  },
});
