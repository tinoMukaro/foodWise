import cron from "node-cron";
import { expireDeals, autoDeleteExpiredDeals } from "../services/deal.expiration.js";


export function startDealCron() {
  cron.schedule("* * * * *", async () => {
    try {
      await expireDeals();             
      await autoDeleteExpiredDeals();  
    } catch (err) {
      console.error("Deal cron failed:", err);
    }
  });

  console.log("Deal expiration + cleanup cron started");
}
