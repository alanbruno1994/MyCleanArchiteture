import { Request, Response } from "express";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import {
  DeleteControllerCar,
  FindAllControllerCar,
  FindOneControllerCar,
  RegisterControllerCar,
  UpdateControllerCar,
} from "../../3_controller/controller/car";
import { InputCarCreate } from "../../3_controller/Validators/car/inputCreateCar";
import { InputCarUpdate } from "../../3_controller/Validators/car/inputUpdateCar";
import container from "../../shared/ioc/container";
import { AbstractControllerAdapter } from "./abstractController";

export class ControllerCar extends AbstractControllerAdapter {
  async register(req: Request, resp: Response): Promise<Response> {
    try {
      const token = ("" + req.headers.authorization).replace("Bearer ", "");
      const controller = container.get(RegisterControllerCar);
      const input = new InputCarCreate(req.body);
      const result = await controller.run(input, token);
      return resp.status(result.statusCode).send(result.body);
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
      const controller = container.get(FindAllControllerCar);
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
      const controller = container.get(FindOneControllerCar);
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
      const controller = container.get(UpdateControllerCar);
      const input = new InputCarUpdate(req.body);
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
      const controller = container.get(DeleteControllerCar);
      const result = await controller.run(securedId, token);
      return resp.status(result.statusCode).send(result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send(error.mensage);
    }
  }
}
