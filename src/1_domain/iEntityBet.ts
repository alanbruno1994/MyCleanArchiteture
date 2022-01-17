import { Time } from "./time";

export interface IBetEntity extends Time {
  id: number;
  numberChoose: string;
  securedId: string;
  priceGame: number;
  carId: number;
  userId: number;
}
