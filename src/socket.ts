import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import { nanoid } from "nanoid";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
  },
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  logger.info(`Sockets are running`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User synched ${socket.id}`);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log({ roomName });
      // Creating a new roomId
      const roomId = nanoid();
      // Adding the newly created room to Object

      rooms[roomId] = {
        name: roomName,
      };

      socket.join(roomId);
      // displaying to everyone that there's a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
      // emit even to room creator of other rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // emit event to room creator that he/she joined the room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
}

export default socket;
