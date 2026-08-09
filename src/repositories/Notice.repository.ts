import noticeModel from "../models/Notice.model";
import BaseRepository from "./Base.repository";

class NoticeRepository extends BaseRepository {
  constructor() {
    super(noticeModel as any);
  }
}

export default NoticeRepository;
