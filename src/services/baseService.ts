import { Collection, Document, ObjectId, WithId } from 'mongodb';
import { mongoClient } from '@/lib/mongodb';

export interface BaseDocument extends Document {
  _id?: ObjectId;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseService<T extends BaseDocument> {
  protected collection: Collection<T>;

  constructor(collectionName: string) {
    const db = mongoClient.getDb();
    this.collection = db.collection<T>(collectionName);
  }

  async findAll(): Promise<T[]> {
    const documents = await this.collection.find().toArray();
    return documents as T[];
  }

  async findById(id: string): Promise<T | null> {
    const document = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    } as any);
    return document as T;
  }

  async create(data: Omit<T, '_id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const now = new Date();
    const documentToInsert = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as T;
    
    const result = await this.collection.insertOne(documentToInsert);
    return {
      ...documentToInsert,
      _id: result.insertedId,
    } as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
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
    const result = await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    } as any);
    return result.deletedCount === 1;
  }
}