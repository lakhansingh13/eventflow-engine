import { createClient } from "redis";

const client = createClient({
  url: "redis://default:ChtWsSr7fl5FdKRjRNqDw3Ry2R3qaC71@redis-14489.crce292.ap-south-1-2.ec2.cloud.redislabs.com:14489"
});

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

export const connectRedis = async () => {
  await client.connect();
  console.log("Redis connected ✅");
};

export default client;