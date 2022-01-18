import { Time } from "./time";

export interface IBetEntity extends Time {
  id: number;
  numberChoose: string;
  securedId: string;
  priceGame: number;
  userId: number;
}
