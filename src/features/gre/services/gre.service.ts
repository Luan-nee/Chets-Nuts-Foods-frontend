// importación de clases
import GreApi from '../../../api/gre.api';
// importación de tipos
import type { simpleGreType, DetailedGreType } from '../types/gre.type';

const greApi = new GreApi();

export default class GreService {
  public async getGuiasRemision() {
    return greApi.get<simpleGreType[]>();
  }
  public async getDetallesGuiaRemision(id: number) {
    return greApi.getByCodigoSeguimiento<DetailedGreType>(id);
  }
}