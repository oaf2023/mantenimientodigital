import { MongoClient, ServerApiVersion } from 'mongodb';

class MongoDBClient {
  private static instance: MongoDBClient;
  private client: MongoClient;
  private uri: string = 'mongodb://localhost:27017';

  private constructor() {
    // Intentamos obtener la configuración guardada
    const storageConfig = localStorage.getItem('storageConfig');
    if (storageConfig) {
      const { storageType, path } = JSON.parse(storageConfig);
      
      // Configuramos la URI de MongoDB según el tipo de almacenamiento
      switch (storageType) {
        case 'local':
          this.uri = 'mongodb://localhost:27017';
          break;
        case 'server':
          // Asumimos que el path contiene la dirección IP o hostname del servidor
          this.uri = `mongodb://${path}:27017`;
          break;
        case 'cloud':
          // Asumimos que el path contiene la URI completa de MongoDB Atlas
          this.uri = path;
          break;
        default:
          console.log('Usando configuración local por defecto');
      }
    }

    console.log('Inicializando conexión MongoDB con URI:', this.uri);
    
    this.client = new MongoClient(this.uri, {
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