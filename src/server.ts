import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { connectToDatabase } from './database/dbConfig';


const PORT = process.env.PORT || 3000;

(async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();