import savedModel from "../models/Saved.model";
import BaseRepository from "./Base.repository";

class SavedRepository extends BaseRepository {
  constructor() {
    super(savedModel as any);
  }
}

export default SavedRepository;
