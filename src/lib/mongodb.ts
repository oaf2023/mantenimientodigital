import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

class MongoDBClient {
  private static instance: MongoDBClient;
  private client: MongoClient;

  private constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  public static getInstance(): MongoDBClient {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient();
    }
    return MongoDBClient.instance;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Successfully connected to MongoDB.");
      return this.client.db("Mantenimiento");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log("Successfully disconnected from MongoDB.");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  getDb() {
    return this.client.db("Mantenimiento");
  }
}

export const mongoClient = MongoDBClient.getInstance();