import type { Establecimiento } from "../types/establecimiento.type";
import { EstablecimientoApi } from "../../../api/establecimientos.api.ts";

const establecimientoApi = new EstablecimientoApi();

export default class EstablecimientoService  {
  public async getEstablecimientos(pagina: number) {
    return establecimientoApi.get<Establecimiento[]>(pagina);
  }
}
