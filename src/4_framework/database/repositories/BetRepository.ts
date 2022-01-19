import { Relation } from "../../../2_business/repositories/iRelation";
import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { SuccessShared } from "../../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import {
  IBetRepository,
  InputCreate,
  InputFindOne,
  Where,
} from "../../../2_business/repositories/betRepository";
import { ICarEntity } from "../../../1_domain/iEntityCar";
import { Bet } from "../models/bet";
import { ErrosBet } from "../../../2_business/module/erros/bet/betErrors";

@injectable()
export class BetRepository implements IBetRepository {
  constructor(@inject(Bet) private readonly bet: typeof Bet) {}

  async create(input: InputCreate): Promise<Result> {
    try {
      const bet: any = await this.bet.create(input);
      if (!bet) throw new Error();
      return SuccessShared.successRegister(bet);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async update(
    input: Partial<Omit<ICarEntity, "id" | "securedId">>,
    where: Where
  ): Promise<Result> {
    try {
      const bet = await this.bet.findOne({
        where: {
          [where.key]: where.valueKey,
        },
      });
      if (!bet) return ErrosBet.errorBetNotFound();
      await bet.update({ ...input });
      return SuccessShared.successFind(bet);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async delete(input: Where): Promise<Result> {
    try {
      const bet: any = await this.bet.findOne({
        where: {
          [input.key]: input.valueKey,
        },
      });
      if (!bet) return ErrosBet.errorBetNotFound();
      return SuccessShared.successDelete(bet);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findAll(input: Relation): Promise<Result> {
    try {
      return SuccessShared.successFind(await this.bet.findAll());
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findOne(input: InputFindOne): Promise<Result> {
    try {
      const bet: any = await this.bet.findOne({
        where: {
          [input.where.key]: input.where.valueKey,
        },
      });

      if (!bet) return ErrosBet.errorBetNotFound();
      return SuccessShared.successFind(bet);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
