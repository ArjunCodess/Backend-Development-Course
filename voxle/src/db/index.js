import mongoose from 'mongoose';

export default async function connectToDatabase() {
     try {
          const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)

          console.log("Connected to database. DB HOST: " + connectionInstance.connection.host)
     }
     
     catch (error) {
          console.error("Couldn't connect to database: " + error)
          process.exit(1);
     }
}