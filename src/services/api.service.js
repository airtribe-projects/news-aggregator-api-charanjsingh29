import axios from "axios";
import redisClient from "./redis.connection.js";

const get = async (url) => {
    try{
        const cacheKey = url.split("?")[0];
        if(redisClient.isOpen){
            console.log("Redis is open")
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log('Serving from Redis cache');
                return JSON.parse(cachedData);
            }
        }
        console.log('Serving from API');
        const response = await axios.get(url);
        if(redisClient.isOpen){
            const CACHE_TTL = 60; // 60 sec
            await redisClient.set(cacheKey, JSON.stringify(response.data), 'EX', CACHE_TTL);
        }
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e.message)
    }
};

export default {
    get
}