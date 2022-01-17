import { Time } from "./time";

export interface IGameEntity extends Time {
  id: number;
  type: string;
  securedId: string;
  color: string;
  price: number;
  range: number;
  maxNumber: number;
}
