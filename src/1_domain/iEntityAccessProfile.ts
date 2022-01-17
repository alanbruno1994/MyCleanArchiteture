import { Time } from "./time";

export interface IAccessProfileEntity extends Time {
  id: number;
  level: string;
  securedId: string;
}
