import { createClient } from "redis";

const redisClient = createClient({
    host: 'localhost',
    port: 6379,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
if(!redisClient.isOpen){
    redisClient.connect();
}

export default redisClient;