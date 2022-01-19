import { Relation } from "../../../2_business/repositories/iRelation";
import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { SuccessShared } from "../../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import {
  IGameRepository,
  InputCreate,
  InputFindOne,
  Where,
} from "../../../2_business/repositories/gameRepository";
import { ICarEntity } from "../../../1_domain/iEntityCar";
import { Game } from "../models/game";
import { ErrosGame } from "../../../2_business/module/erros/game/gameErrors";

@injectable()
export class GameRepository implements IGameRepository {
  constructor(@inject(Game) private readonly game: typeof Game) {}

  async create(input: InputCreate): Promise<Result> {
    try {
      const game: any = await this.game.create(input);
      if (!game) throw new Error();
      return SuccessShared.successRegister(game);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async update(
    input: Partial<Omit<ICarEntity, "id" | "securedId">>,
    where: Where
  ): Promise<Result> {
    try {
      const game = await this.game.findOne({
        where: {
          [where.key]: where.valueKey,
        },
      });
      if (!game) return ErrosGame.errorGameNotFound();
      await game.update({ ...input });
      return SuccessShared.successFind(game);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async delete(input: Where): Promise<Result> {
    try {
      const game: any = await this.game.findOne({
        where: {
          [input.key]: input.valueKey,
        },
      });
      if (!game) return ErrosGame.errorGameNotFound();
      return SuccessShared.successDelete(game);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findAll(input: Relation): Promise<Result> {
    try {
      return SuccessShared.successFind(await this.game.findAll());
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findOne(input: InputFindOne): Promise<Result> {
    try {
      const game: any = await this.game.findOne({
        where: {
          [input.where.key]: input.where.valueKey,
        },
      });

      if (!game) return ErrosGame.errorGameNotFound();
      return SuccessShared.successFind(game);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
