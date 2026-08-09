import BaseRepository from "./Base.repository";
import ShopModel from "../models/Shop.model";

class ShopRepository extends BaseRepository{
  constructor() {
    super(ShopModel as any);
  }
}

export default ShopRepository;
