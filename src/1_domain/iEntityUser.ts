import { Time } from "./time";

export interface IUserEnity extends Time {
  id: number;
  name: string;
  email: string;
  password: string;
  securedId: string;
  accessProfileId: number;
  carId: number;
  image?: string;
}
