import { Document } from "mongoose";
import CategoryModel from "../models/Category.model";
import BaseRepository from "./Base.repository";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(CategoryModel as any);
  }
}

export default CategoryRepository;
