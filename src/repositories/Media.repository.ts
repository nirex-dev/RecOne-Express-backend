import BaseRepository from "./Base.repository";
import MediaModel from "../models/Media.model";

class MediaRepository extends BaseRepository {
  constructor() {
    super(MediaModel as any);
  }

  async findAll(
    pipeline: any[],
    sort: Object | string,
    page: number,
    limit: number,
    customLabels: Object,
  ) {
    const options = {
      page,
      limit,
      sort,
      customLabels,
    };

    return (this.model as any).aggregatePaginate(
      this.model.aggregate(pipeline),
      options,
    );
  }
}

export default MediaRepository;
