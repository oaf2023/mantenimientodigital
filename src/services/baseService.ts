import { Collection, Document, ObjectId, WithId, OptionalUnlessRequiredId } from 'mongodb';
import { MongoClient } from 'mongodb';

export interface BaseDocument extends Document {
  _id?: ObjectId;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseService<T extends BaseDocument> {
  protected collection: Collection<T>;
  private client: MongoClient;
  private dbName = "Mantenimiento";

  constructor(collectionName: string) {
    // Inicializamos el cliente de MongoDB pero no nos conectamos aún
    this.client = new MongoClient('mongodb://localhost:27017');
    this.collection = this.client.db(this.dbName).collection<T>(collectionName);
  }

  private async ensureConnection() {
    try {
      // Verificamos si el cliente está conectado usando el método recomendado
      await this.client.db("admin").command({ ping: 1 });
    } catch (error) {
      // Si no está conectado, intentamos conectar
      await this.client.connect();
      console.log("Connected to MongoDB");
    }
  }

  async findAll(): Promise<T[]> {
    await this.ensureConnection();
    const documents = await this.collection.find().toArray();
    return documents as T[];
  }

  async findById(id: string): Promise<T | null> {
    await this.ensureConnection();
    const document = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    } as any);
    return document as T;
  }

  async create(data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    await this.ensureConnection();
    const now = new Date();
    const documentToInsert = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as OptionalUnlessRequiredId<T>;
    
    const result = await this.collection.insertOne(documentToInsert);
    return {
      ...documentToInsert,
      _id: result.insertedId,
    } as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await this.ensureConnection();
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) } as any,
      { 
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    
    return result as T;
  }

  async delete(id: string): Promise<boolean> {
    await this.ensureConnection();
    const result = await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    } as any);
    return result.deletedCount === 1;
  }
}