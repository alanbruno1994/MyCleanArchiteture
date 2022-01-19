import { Result } from "../../shared/Result";
import { Relation } from "./iRelation";
import "reflect-metadata";
import { IGameEntity } from "../../1_domain/iEntityGame";

export const IGameRepositorySymbol = Symbol.for("IGameRepositorySymbol");

export type InputCreate = Omit<IGameEntity, "id">;
export type InputUpdate = Partial<Omit<IGameEntity, "id">>;
export type Where = {
  key: keyof IGameEntity;
  valueKey: any;
};
export type InputFindOne = {
  where: Where;
  relation?: Relation;
  attributes?: string[];
};

export interface IGameRepository {
  create(input: InputCreate): Promise<Result>;
  delete(input: Where): Promise<Result>;
  findAll(input: Relation): Promise<Result>;
  findOne(input: InputFindOne): Promise<Result>;
  update(input: InputUpdate, where: Where): Promise<Result>;
}
