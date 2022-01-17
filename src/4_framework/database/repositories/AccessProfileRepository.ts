/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
import { Relation } from "../../../2_business/repositories/iRelation";
import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import {
  IAccessProfileRepository,
  inputCreate,
  InputFindOne,
  Where,
} from "../../../2_business/repositories/accessRepository";
import { AccessProfile } from "../models/accessprofile";
import { SuccessShared } from "../../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import { ErrosAccessProfile } from "../../../2_business/module/erros/access/accessErrors";
import { IAccessProfileEntity } from "../../../1_domain/iEntityAccessProfile";

@injectable()
export class AccessProfilerRepository implements IAccessProfileRepository {
  constructor(
    @inject(AccessProfile) private readonly access: typeof AccessProfile
  ) {}

  async create(input: inputCreate): Promise<Result> {
    try {
      const user: any = await this.access.create(input);
      if (!user) throw new Error();
      return SuccessShared.successRegister(user);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async update(
    input: Partial<Omit<IAccessProfileEntity, "id">>,
    where: Where
  ): Promise<Result> {
    try {
      const access = await this.access.findOne({
        where: {
          [where.key]: where.valueKey,
        },
      });
      if (!access) return ErrosAccessProfile.errorAccessProfileNotFound();
      await access.update({ ...input });
      return SuccessShared.successFind(access);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async delete(input: Where): Promise<Result> {
    try {
      const access: any = await this.access.findOne({
        where: {
          [input.key]: input.valueKey,
        },
      });
      if (!access) return ErrosAccessProfile.errorAccessProfileNotFound();
      return SuccessShared.successDelete(access);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findAll(input: Relation): Promise<Result> {
    try {
      return SuccessShared.successFind(await this.access.findAll());
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findOne(input: InputFindOne): Promise<Result> {
    try {
      const access: any = await this.access.findOne({
        where: {
          [input.where.key]: input.where.valueKey,
        },
      });

      if (!access) return ErrosAccessProfile.errorAccessProfileNotFound();
      return SuccessShared.successFind(access);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
