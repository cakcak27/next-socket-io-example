import { Socket } from "socket.io";

async function computeUserIdFromHeaders(headers: any) {
    // to be implemented
    console.log(headers.data)
    return null;
}

export const configureSocketAuth = async (io: any) => {
    io.use(async (socket: Socket, next: (err?: Error) => void) => {
        const userId = await computeUserIdFromHeaders(
            socket.handshake.headers
        );

        if(!userId) {
            socket.disconnect()
            next()
        }

        socket.data.userId = userId;
        console.log("userId", socket.data.userId)

        next();
    });
};
