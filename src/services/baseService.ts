import { Collection, Document, ObjectId } from 'mongodb';
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
    return await this.collection.find().toArray();
  }

  async findById(id: string): Promise<T | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: Omit<T, '_id'>): Promise<T> {
    const now = new Date();
    const documentToInsert = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await this.collection.insertOne(documentToInsert as T);
    return {
      ...documentToInsert,
      _id: result.insertedId,
    } as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}