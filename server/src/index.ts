import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from 'express'
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const app = express();

export interface CustomSocket extends Socket {
  userId: string;
}

const handleEvent = (data: any) => {
  if (isMainThread) {
    const worker = new Worker(`${__dirname}/worker.js`, {
      workerData: data
    });
    worker.on('message', (data: any) => console.log(data, "parent"));
    worker.on('error', (err: any) => {
      console.log(err)

    });
    worker.on('exit', (code: any) => {
      console.log(code)

    });
  }
}

(async () => {
  try {
    const server = createServer(app);

    const io = new Server(server, {
      cors: {
      },
    });

    io.on("connection", (socket: any) => {
      socket.emit("connection", socket.id);
      socket.on("event", (data: any) => {
        handleEvent(data)
      })
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    server.listen(5000, () => {
      console.log(`Listening on port 5000`);
    });
  } catch (err) {
    console.log(err);
  }
})();
