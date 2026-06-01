import { io } from "socket.io-client";
import {conexionSocket, URL  } from "./const";

export const getSocket = io(URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem(conexionSocket),
  },
});
