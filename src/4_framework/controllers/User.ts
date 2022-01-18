import { Request, Response } from "express";
import { AbstractControllerAdapter } from "./abstractController";
import { InputUpdateUser } from "../../3_controller/Validators/user/inputUpdateUser";
import "../ioc/inversify.config";
import { injectable } from "inversify";
import { InputCreateUser } from "../../3_controller/Validators/user/inputCreateUser";
import container from "../../shared/ioc/container";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import {
  DeleteControllerUser,
  FindAllControllerUser,
  FindOneControllerUser,
  RegisterControllerAdmin,
  RegisterControllerPlayer,
  UpdateControllerUser,
} from "../../3_controller/controller/user";
@injectable()
export class ControllerUserAdapter extends AbstractControllerAdapter {
  async register(
    req: Request,
    resp: Response,
    operation: string = "player"
  ): Promise<Response> {
    try {
      if (operation === "admin") {
        const token = ("" + req.headers.authorization).replace("Bearer ", "");
        const controller = container.get(RegisterControllerAdmin);
        const input = new InputCreateUser(req.body);
        const result = await controller.run(input, token);
        return resp.status(result.statusCode).send(result.body);
      } else {
        const controller = container.get(RegisterControllerPlayer);
        const input = new InputCreateUser(req.body);
        const result = await controller.run(input);
        return resp.status(result.statusCode).send(result.body);
      }
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
      const controller = container.get(FindAllControllerUser);
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
      const controller = container.get(FindOneControllerUser);
      const result = await controller.run(securedId, token);
      return resp.status(result.statusCode).send(result.body);
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
      const controller = container.get(UpdateControllerUser);
      const input = new InputUpdateUser(req.body);
      const result = await controller.run(input, securedId, token);
      return resp.status(result.statusCode).send(result.body);
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
      const controller = container.get(DeleteControllerUser);
      const result = await controller.run(securedId, token);
      return resp.status(result.statusCode).send(result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }
}
