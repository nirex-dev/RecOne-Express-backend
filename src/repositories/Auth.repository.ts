import { Document } from "mongoose";
import BaseRepository from "./Base.repository";
import UserModel from "../models/User.model";

class AuthRepository extends BaseRepository{
  constructor() {
    super(UserModel as any);
  }

  async findByEmailOrPhone(
    email: string,
    phoneNO: number,
  ): Promise<Document | null> {
    return await this.findOne({ $or: [{ email }, { phoneNO }] });
  }

  async findByPhoneNo(phoneNo: number) {
    return await this.findOne({ number: phoneNo });
  }
}

export default AuthRepository;
