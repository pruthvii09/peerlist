// socket.js
import { io } from "socket.io-client";

// Replace with your server URL
const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL;

const socket = io(SOCKET_SERVER_URL);

export default socket;
