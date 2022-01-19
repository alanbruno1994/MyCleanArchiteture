import { Request, Response } from "express";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import {
  DeleteControllerBet,
  FindAllControllerBet,
  FindOneControllerBet,
  RegisterControllerBet,
  UpdateControllerBet,
} from "../../3_controller/controller/bet";
import { InputBetCreate } from "../../3_controller/Validators/bet/inputCreateBet";
import { InputBetUpdate } from "../../3_controller/Validators/bet/inputUpdateBet";
import container from "../../shared/ioc/container";
import { isIError } from "../../shared/Result";
import { AbstractControllerAdapter } from "./abstractController";

export class ControllerBetAdapter extends AbstractControllerAdapter {
  async register(req: Request, resp: Response): Promise<Response> {
    try {
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(RegisterControllerBet);
      const input = new InputBetCreate(req.body);
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
      const controller = container.get(FindAllControllerBet);
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
      const controller = container.get(FindOneControllerBet);
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
      const controller = container.get(UpdateControllerBet);
      const input = new InputBetUpdate(req.body);
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
      const controller = container.get(DeleteControllerBet);
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
