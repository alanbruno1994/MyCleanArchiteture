import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
@injectable()
export abstract class AbstractControllerAdapter {
  abstract register(req: Request, resp: Response): Promise<Response>;
  abstract findAll?(req: Request, resp: Response): Promise<Response>;
  abstract findOne?(req: Request, resp: Response): Promise<Response>;
  abstract update?(req: Request, resp: Response): Promise<Response>;
  abstract delete?(req: Request, resp: Response): Promise<Response>;
}
