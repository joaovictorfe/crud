import { Request, Response } from "express";
import { CreateVideosService } from "../services/CreateVideoService";

export class CreateVideoController {
  async handle(request: Request, response: Response) {
    const { name, description, category_id, duration } = request.body;

    const service = new CreateVideosService();

    const result = await service.execute({
      name,
      description,
      duration,
      category_id,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}