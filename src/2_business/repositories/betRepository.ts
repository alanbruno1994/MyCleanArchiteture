import { Result } from "../../shared/Result";
import { Relation } from "./iRelation";
import "reflect-metadata";
import { IBetEntity } from "../../1_domain/iEntityBet";

export const IBetRepositorySymbol = Symbol.for("IBetRepositorySymbol");

export type InputCreate = Omit<IBetEntity, "id">;
export type InputUpdate = Partial<Omit<IBetEntity, "id">>;
export type Where = {
  key: keyof IBetEntity;
  valueKey: any;
};
export type InputFindOne = {
  where: Where;
  relation?: Relation;
};

export interface IBetRepository {
  create(input: InputCreate): Promise<Result>;
  delete(input: Where): Promise<Result>;
  findAll(input: Relation): Promise<Result>;
  findOne(input: InputFindOne): Promise<Result>;
  update(input: InputUpdate, where: Where): Promise<Result>;
}
