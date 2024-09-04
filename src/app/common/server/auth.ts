import { Socket } from "socket.io";

async function computeUserIdFromHeaders(headers: any) {
    // to be implemented
    return "ikbal"
}

export const configureSocketAuth = async (io: any) => {
    io.use(async (socket: Socket, next: (err?: Error) => void) => {
        socket.data.userId = await computeUserIdFromHeaders(
            socket.handshake.headers
        );
        console.log("userId", socket.data.userId)

        next();
    });
};
