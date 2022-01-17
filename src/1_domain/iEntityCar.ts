import { Time } from "./time";

export interface ICarEntity extends Time {
  id: number;
  model: string;
  color: string;
  securedId: string;
  year: number;
}
