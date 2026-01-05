import cron from "node-cron";
import { expireDeals } from "../services/deal.expiration.js";


export function startDealCron() {
  cron.schedule("* * * * *", async () => {
    await expireDeals();
  })
};

  console.log("Deal expiration cron started");