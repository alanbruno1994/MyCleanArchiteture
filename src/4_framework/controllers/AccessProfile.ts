import { Request, Response } from "express";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import {
  DeleteControllerAccessProfile,
  FindAllControllerAccessProfile,
  FindOneControllerAccessProfile,
  RegisterControllerAccessProfile,
  UpdateControllerAccessProfile,
} from "../../3_controller/controller/access";
import { InputAccessProfileCreate } from "../../3_controller/Validators/accessProfile/inputCreateAccessProfile";
import { InputAccessProfileUpdate } from "../../3_controller/Validators/accessProfile/inputUpdateAccessProfile";
import container from "../../shared/ioc/container";
import { isIError } from "../../shared/Result";
import { AbstractControllerAdapter } from "./abstractController";

export class ControllerAccessProfileAdapter extends AbstractControllerAdapter {
  async register(req: Request, resp: Response): Promise<Response> {
    try {
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(RegisterControllerAccessProfile);
      const input = new InputAccessProfileCreate(req.body);
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
      const controller = container.get(FindAllControllerAccessProfile);
      const result = await controller.run(token);
      return resp.status(result.statusCode).send(result.body);
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
      const controller = container.get(FindOneControllerAccessProfile);
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
      const controller = container.get(UpdateControllerAccessProfile);
      const input = new InputAccessProfileUpdate(req.body);
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
      const controller = container.get(DeleteControllerAccessProfile);
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
