import type { PropProduct } from "../types/Product";
import type { PropResumenProduct } from "./ResumenProduct";

export type PropData = PropProduct[] | PropResumenProduct[];

export type PropResponse = {
  status: number;
  message: string;
  info: PropData;
}