import { IFood } from "./IFood";

export interface ICart extends IFood {
  count: number,
  total: number
}