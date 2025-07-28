import { RedisClientType, createClient } from "redis";

export class RedisPubSub {
    private static instanceRedisPubsub: RedisPubSub;

    pubClient: RedisClientType;
    subClient: RedisClientType;

    public static getInstance(): RedisPubSub {
        if (!RedisPubSub.instanceRedisPubsub) {
            RedisPubSub.instanceRedisPubsub = new RedisPubSub();
        }

        return RedisPubSub.instanceRedisPubsub;
    }

    private constructor() {
        this.pubClient = createClient({ url: process.env.REDIS_URL });
        this.subClient = this.pubClient.duplicate();
    }

    public getPubClient() {
        return this.pubClient;
    }

    public getSubClient() {
        return this.subClient;
    }
}

export async function getRedisPubSubInstance() {
    const { pubClient, subClient } = RedisPubSub.getInstance();
    
    pubClient.on('error', err => console.error('PubClient Error', err));
    subClient.on('error', err => console.error('SubClient Error', err));

    if(!pubClient.isOpen){
        await pubClient.connect()
    }

    if(!subClient.isOpen) {
        await subClient.connect()
    }
    return { pubClient, subClient };
}
