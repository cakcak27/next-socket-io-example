import { type NextRequest } from "next/server";
import { broadcastEvent } from "../../common/events/broadcast.event";
import { title } from "process";
import { getRedisPubSubInstance } from "../../utils/redis-pubsub";

// export const dynamic = "force-static";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") || null;

    const { pubClient } = await getRedisPubSubInstance();
    pubClient.publish("notification",JSON.stringify({
        title: "New Notification",
        message: "You have a new notification",
    }))

    return Response.json({
        query: {
            id,
        },
        message: "Message Retrieve Successfully",
    });
}

export async function POST(request: NextRequest) {}
