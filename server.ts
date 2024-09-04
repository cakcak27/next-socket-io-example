import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { configureSocketAuth } from "./src/app/common/server/auth";
import { broadcastEvent } from "./src/app/common/events/broadcast.event";
import { parse } from "node:url";
import { createAdapter } from "@socket.io/redis-adapter";
import { getRedisPubSubInstance } from "./src/app/utils/redis-pubsub";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handler(req, res, parsedUrl);
    });

    const { pubClient, subClient } = await getRedisPubSubInstance();
    const io = new Server(httpServer, {
        adapter: createAdapter(pubClient, subClient),
    });

    await configureSocketAuth(io);

    
    io.on("connection", async (socket) => {
      await subClient.subscribe("notification", (data)=>{
        console.log("on notification", data)
        socket.emit("notification", JSON.parse(data));
      })
      // ...
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
