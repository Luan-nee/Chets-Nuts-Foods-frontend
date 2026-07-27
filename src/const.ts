import { io } from "socket.io-client";
import { url_base_endpoint } from "./config/url_base";

export const URL = url_base_endpoint;
export const conexionSocket = "token";
export const DIRACCESOSLOCAL = "CHETS-ACCESOS-LOCAL"

export const socket = io(URL, {
  autoConnect: false,
});