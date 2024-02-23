import { Accessory } from "./accessory.model";
import { Image } from "./image.model";

export interface StockItem {
  id?: number;
  regNo: string;
  make: string;
  model: string;
  modelYear: string;
  kms: string;
  colour: string;
  vinNo: string;
  retailPrice: number;
  costPrice: number;
  dtCreated: Date;
  dtUpdated: Date;
  accessories: Accessory[];
  images: Image[];
}
