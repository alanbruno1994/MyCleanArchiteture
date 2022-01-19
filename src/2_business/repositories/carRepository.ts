import { Result } from "../../shared/Result";
import { Relation } from "./iRelation";
import "reflect-metadata";
import { ICarEntity } from "../../1_domain/iEntityCar";
export const ICarRepositorySymbol = Symbol.for("ICarRepositorySymbol");

export type InputCreate = Omit<ICarEntity, "id">;
export type InputUpdate = Partial<Omit<ICarEntity, "id">>;
export type Where = {
  key: keyof ICarEntity;
  valueKey: any;
};
export type InputFindOne = {
  where: Where;
  relation?: Relation;
  attributes?: string[];
};

export interface ICarRepository {
  create(input: InputCreate): Promise<Result>;
  delete(input: Where): Promise<Result>;
  findAll(input: Relation): Promise<Result>;
  findOne(input: InputFindOne): Promise<Result>;
  update(input: InputUpdate, where: Where): Promise<Result>;
}
