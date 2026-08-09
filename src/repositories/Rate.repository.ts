import BaseRepository from "./Base.repository";
import RateModel from "../models/Rate.model";

class RateRepository extends BaseRepository {
  constructor() {
    super(RateModel as any);
  }
}

export default RateRepository;
