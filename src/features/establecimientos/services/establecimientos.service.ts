import type { Establecimiento, tipoEstablecimiento, responsableEstablecimiento } from "../types/establecimiento.type";
import { EstablecimientoApi } from "../../../api/establecimientos.api.ts";

const establecimientoApi = new EstablecimientoApi();

export default class EstablecimientoService  {
  public async getEstablecimientos(pagina: number) {
    return establecimientoApi.get<Establecimiento[]>(pagina);
  }
  public async getTiposEstablecimientos() {
    return establecimientoApi.getSinPaginacion<tipoEstablecimiento[]>();
  }
  public async getResponsablesEstablecimiento(pagina: number) {
    return establecimientoApi.getResponsablesEstablecimiento<responsableEstablecimiento[]>(pagina);
  }
}
