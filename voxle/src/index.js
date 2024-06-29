import { app } from './app.js';
import dotenv from 'dotenv';
import connectToDatabase from './db/index.js'

dotenv.config({ path: "./.env" });

connectToDatabase()
     .then(() => {
          app.listen(process.env.PORT, () => {
               console.log(`Server is running on port ${process.env.PORT}`);
          })
     })