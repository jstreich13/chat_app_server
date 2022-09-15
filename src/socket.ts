import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
};

function socket({ io }: { io: Server }) {
  logger.info(`Sockets are running`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User synched ${socket.id}`);
  });
}

export default socket;
