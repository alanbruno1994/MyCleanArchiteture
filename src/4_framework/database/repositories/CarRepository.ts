/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
import { Relation } from "../../../2_business/repositories/iRelation";
import { Result } from "../../../shared/Result";
import { inject, injectable } from "inversify";
import { SuccessShared } from "../../../2_business/module/success/shared/successShared";
import { ErrosShared } from "../../../2_business/module/erros/shared/errosShared";
import {
  ICarRepository,
  InputCreate,
  InputFindOne,
  Where,
} from "../../../2_business/repositories/carRepository";
import { ICarEntity } from "../../../1_domain/iEntityCar";
import { ErrosCar } from "../../../2_business/module/erros/car/carErrors";
import { Car } from "../models/car";

@injectable()
export class CarRepository implements ICarRepository {
  constructor(@inject(Car) private readonly car: typeof Car) {}

  async create(input: InputCreate): Promise<Result> {
    try {
      const car: any = await this.car.create(input);
      if (!car) throw new Error();
      return SuccessShared.successRegister(car);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async update(
    input: Partial<Omit<ICarEntity, "id" | "securedId">>,
    where: Where
  ): Promise<Result> {
    try {
      const car = await this.car.findOne({
        where: {
          [where.key]: where.valueKey,
        },
      });
      if (!car) return ErrosCar.errorCarNotFound();
      await car.update({ ...input });
      return SuccessShared.successFind(car);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async delete(input: Where): Promise<Result> {
    try {
      const car: any = await this.car.findOne({
        where: {
          [input.key]: input.valueKey,
        },
      });
      if (!car) return ErrosCar.errorCarNotFound();
      return SuccessShared.successDelete(car);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findAll(input: Relation): Promise<Result> {
    try {
      return SuccessShared.successFind(await this.car.findAll());
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
  async findOne(input: InputFindOne): Promise<Result> {
    try {
      const car: any = await this.car.findOne({
        where: {
          [input.where.key]: input.where.valueKey,
        },
      });

      if (!car) return ErrosCar.errorCarNotFound();
      return SuccessShared.successFind(car);
    } catch (error) {
      return ErrosShared.errorInternalServerError();
    }
  }
}
