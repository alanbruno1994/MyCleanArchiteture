import { IUserEnity } from "../../1_domain/iEntityUser";
import { Result } from "../../shared/Result";
import { Relation } from "./iRelation";
import "reflect-metadata";
export const IUserRepositorySymbol = Symbol.for("IUserRepositorySymbol");

export type inputCreate = Omit<IUserEnity, "id">;
export type inputUpdate = Partial<Omit<IUserEnity, "id">>;
export type inputDelete = keyof Omit<IUserEnity, "password">;
export type Where = {
  key: keyof Omit<IUserEnity, "password">;
  valueKey: any;
};
export type InputFindOne = {
  where: Where;
  relation?: Relation;
};

export interface IUserRepository {
  create(input: inputCreate): Promise<Result>;
  update(input: inputUpdate, where: Where): Promise<Result>;
  delete(input: Where): Promise<Result>;
  findAll(input: Relation): Promise<Result>;
  findOne(input: InputFindOne): Promise<Result>;
}
