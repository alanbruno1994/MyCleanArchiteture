/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
import { IUserEnity } from "../../../1_domain/iEntityUser";
import { Relation } from "../../../2_business/repositories/iRelation";
import {
  inputCreate,
  InputFindOne,
  IUserRepository,
  Where,
} from "../../../2_business/repositories/userRepository";
import { Result } from "../../../shared/Result";
import { User } from "../models/user";
import { inject, injectable } from "inversify";
import { SuccessShared } from "../../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { ErrosUser } from "../../../2_business/module/erros/user/userErrors";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(User) private readonly user: typeof User) {}

  async create(input: inputCreate): Promise<Result> {
    try {
      const user: any = await this.user.create(input);
      if (!user) throw new Error();
      return SuccessShared.successRegister(user);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async update(
    input: Partial<Omit<IUserEnity, "id" | "securedId">>,
    where: Where
  ): Promise<Result> {
    try {
      const user = await this.user.findOne({
        attributes: [
          "access_profile_id",
          "secured_id",
          "id",
          "created_ad",
          "updated_at",
          "car_id",
        ],
        where: {
          [where.key]: where.valueKey,
        },
      });
      if (!user) return ErrosUser.errorUserNotFound();
      await user.update({ ...input });
      return SuccessShared.successFind(user);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async delete(input: Where): Promise<Result> {
    try {
      const user: any = await this.user.findOne({
        where: {
          [input.key]: input.valueKey,
        },
      });
      if (!user) return ErrosUser.errorUserNotFound();
      return SuccessShared.successDelete(user);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findAll(input: Relation): Promise<Result> {
    try {
      return SuccessShared.successFind(await this.user.findAll());
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findOne(input: InputFindOne): Promise<Result> {
    try {
      const user: any = await this.user.findOne({
        attributes: [
          "access_profile_id",
          "secured_id",
          "id",
          "created_ad",
          "updated_at",
          "car_id",
        ],
        where: {
          [input.where.key]: input.where.valueKey,
        },
      });

      if (!user) return ErrosUser.errorUserNotFound();
      return SuccessShared.successFind(user);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
