import { Request, Response } from "express";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import {
  DeleteControllerGame,
  FindAllControllerGame,
  FindOneControllerGame,
  RegisterControllerGame,
  UpdateControllerGame,
} from "../../3_controller/controller/game";
import { InputGameCreate } from "../../3_controller/Validators/game/inputCreateGame";
import { InputUpdateGame } from "../../3_controller/Validators/game/inputUpdateGame";
import container from "../../shared/ioc/container";
import { isIError } from "../../shared/Result";
import { AbstractControllerAdapter } from "./abstractController";

export class ControllerGameAdapter extends AbstractControllerAdapter {
  async register(req: Request, resp: Response): Promise<Response> {
    try {
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(RegisterControllerGame);
      const input = new InputGameCreate(req.body);
      const result = await controller.run(input, token);
      return resp
        .status(result.statusCode)
        .send(isIError(result) ? { mensagen: result.mensage } : result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }

  async findAll(req: Request, resp: Response): Promise<Response> {
    try {
      // const relation = Object.keys(req.query).map((value) => value);
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(FindAllControllerGame);
      const result = await controller.run(token);
      return resp
        .status(result.statusCode)
        .send(isIError(result) ? { mensagen: result.mensage } : result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }

  async findOne(req: Request, resp: Response): Promise<Response> {
    try {
      // const relation = Object.keys(req.query).map((value) => value);
      const securedId = req.params.securedId;
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(FindOneControllerGame);
      const result = await controller.run(securedId, token);
      return resp
        .status(result.statusCode)
        .send(isIError(result) ? { mensagen: result.mensage } : result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }

  async update(req: Request, resp: Response): Promise<Response> {
    try {
      // const relation = Object.keys(req.query).map((value) => value);
      const securedId = req.params.securedId;
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(UpdateControllerGame);
      const input = new InputUpdateGame(req.body);
      const result = await controller.run(input, securedId, token);
      return resp
        .status(result.statusCode)
        .send(isIError(result) ? { mensagen: result.mensage } : result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }

  async delete(req: Request, resp: Response): Promise<Response> {
    try {
      // const relation = Object.keys(req.query).map((value) => value);
      const securedId = req.params.securedId;
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(DeleteControllerGame);
      const result = await controller.run(securedId, token);
      return resp
        .status(result.statusCode)
        .send(isIError(result) ? { mensagen: result.mensage } : result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }
}
