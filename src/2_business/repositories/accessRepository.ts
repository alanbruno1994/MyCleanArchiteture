import { IAccessProfileEntity } from "../../1_domain/iEntityAccessProfile";
import { Result } from "../../shared/Result";
import { Relation } from "./iRelation";
import "reflect-metadata";
export const IAccessProfileRepositorySymbol = Symbol.for(
  "IAccessProfileRepositorySymbol"
);

export type inputCreate = Omit<IAccessProfileEntity, "id">;
export type InputUpdate = Partial<Omit<IAccessProfileEntity, "id">>;
export type Where = {
  key: keyof IAccessProfileEntity;
  valueKey: any;
};
export type InputFindOne = {
  where: Where;
  relation?: Relation;
  attributes?: string[];
};

export interface IAccessProfileRepository {
  create(input: inputCreate): Promise<Result>;
  delete(input: Where): Promise<Result>;
  findAll(input: Relation): Promise<Result>;
  findOne(input: InputFindOne): Promise<Result>;
  update(input: InputUpdate, where: Where): Promise<Result>;
}
