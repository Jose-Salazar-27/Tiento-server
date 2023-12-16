import type { Request, Response } from "express";
import type { IUserService } from "./services-interfaces";

export interface IUserController {
  readonly service: IUserService;
  messagesByRole(req: Request, res: Response): Promise<void>;
  getGiveAways(req: Request, res: Response): Promise<void>;
  getUserRole(req: any, res: Response): Promise<void>;
}
