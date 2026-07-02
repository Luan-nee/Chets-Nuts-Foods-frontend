import { io } from "socket.io-client";
import { url_base_production } from "./config/url_base";

export const URL = url_base_production;
export const conexionSocket = "token";

export const socket = io(URL, {
  autoConnect: false,
});