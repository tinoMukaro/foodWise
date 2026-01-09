import app from './app.js';
import 'dotenv/config.js';
import { startDealCron } from './config/deal.cron.js';

const PORT = process.env.PORT || 3000;

startDealCron();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
