import * as redis from "redis";

export const redisClient = redis.createClient();

(async () => {

  redisClient.on("error", (error) => console.error(`Redis: ${error}`));

  await redisClient.connect();
})();