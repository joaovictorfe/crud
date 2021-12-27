import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Videos } from "../entities/Videos";

type VideoRequest = {
  name: string;
  description: string;
  duration: number;
  category_id: string;
};

export class CreateVideosService {
  async execute({
    name,
    description,
    duration,
    category_id,
  }: VideoRequest): Promise<Videos | Error> {
    const repo = getRepository(Videos);
    const repoCategory = getRepository(Category);

    if (!(await repoCategory.findOne(category_id))) {
      return new Error("Category does not Exists");
    }

    const videos = repo.create({ name, description, duration, category_id });

    await repo.save(videos);

    return videos;
  }
}
