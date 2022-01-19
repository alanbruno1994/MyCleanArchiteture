import { Request, Response } from "express";
import { ErrosShared } from "../../2_business/module/erros/shared/errosShared";
import { LoginController } from "../../3_controller/controller/auth/LoginController";
import { InputLogin } from "../../3_controller/Validators/auth/authInput";
import container from "../../shared/ioc/container";
import { isIError } from "../../shared/Result";
require("dotenv").config();

export class ControllerLogin {
  static async auth(req: Request, resp: Response): Promise<any> {
    try {
      const controller = container.get(LoginController);
      const input = new InputLogin(req.body);
      const result = await controller.run(input);
      return resp
        .status(result.statusCode)
        .send(isIError(result) ? { mensagen: result.mensage } : result.body);
    } catch (erro) {
      console.log(erro);
      const error = ErrosShared.errorInternalServerError();
      return resp.status(error.statusCode).send({ mensage: error.mensage });
    }
  }
}
