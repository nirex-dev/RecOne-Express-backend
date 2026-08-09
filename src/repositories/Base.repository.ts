import { Document, Model } from "mongoose";

class BaseRepository {
  protected model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model;
  }

  async create(data: Partial<any>): Promise<any> {
    return await this.model.create(data);
  }

  async findById(id: string, select?: string): Promise<any | null> {
    const query = this.model.findById(id);
    if (select) query.select(select);
    return await query.exec();
  }

  async findOne(
    filter: Record<string, any>,
    select?: string,
  ): Promise<any | null> {
    const query = this.model.findOne(filter);
    if (select) query.select(select);
    return await query.exec();
  }

  async find(
    filter: Record<string, any> = {},
    select?: string,
  ): Promise<any[]> {
    const query = this.model.find(filter);
    if (select) query.select(select);
    return await query.exec();
  }

  async updateById(id: string, data: Record<string, any>): Promise<any | null> {
    return await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
  }

  async updateOne(
    filter: Record<string, any>,
    data: Record<string, any>,
  ): Promise<any | null> {
    return await this.model
      .findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async deleteById(id: string): Promise<any | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}

export default BaseRepository;
