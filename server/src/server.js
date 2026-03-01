import app from './app.js';
import 'dotenv/config.js';
import { startDealCron } from './config/deal.cron.js';

const PORT = process.env.PORT || 5000;

startDealCron();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
