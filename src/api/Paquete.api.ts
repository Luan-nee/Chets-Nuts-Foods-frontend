import { url_base_endpoint } from "../config/url_base";
import BaseRequestApi from "./BaseRequest.api";
import type { CreatePaquete, ResponseGetAllPaquetes, ResponseCreatePaquete, ResponseGetPaqueteData } from "../types/paquete.type";
import type { BodyResponse } from "../types/bodyResponse.type";
import type { ProductoEnPaquete } from "../types/constantes.type";

export default class PaqueteApi extends BaseRequestApi {
  private base_url_production = `${url_base_endpoint}/api/paquetes`;

  /* 
    Verificar que la estructura del dato que retorna el endpoint 
    coincide con lo definido en el método createPaquete.
  */
  public async createPaquete(
    body: CreatePaquete,
  ): Promise<BodyResponse<ResponseCreatePaquete>> {
    return this.POST<ResponseCreatePaquete>(`${this.base_url_production}`, body);
  }

  public async agregarProductoEnPaquete(
    productos: ProductoEnPaquete[],
    idPaquete: number,
  ): Promise<BodyResponse<string>> {
    let todoBien = true;
    const productosFormateados: Omit<ProductoEnPaquete, "idproductdefect">[] =
      productos.map(({ idproductdefect: _, ...producto }) => producto);

    productosFormateados.map((producto) => {
      this.POST<string>(
        `${this.base_url_production}/${idPaquete}/producto`,
        producto,
      ).then((response) => {
        if (response.status !== "success") {
          todoBien = false;
        }
        return response;
      });
    });

    return {
      status: "success",
      message: todoBien
        ? "Productos agregados exitosamente"
        : "Error al agregar productos al paquete",
    };
  }

  public async obtenerPaquetes(
    idSalidaTransporte: number,
  ): Promise<BodyResponse<ResponseGetAllPaquetes[]>> {
    return this.GET<ResponseGetAllPaquetes[]>(
      `${this.base_url_production}/${idSalidaTransporte}`,
    );
  }

  public async obtenerDatosPaquete(
    idPaquete: number,
  ): Promise<BodyResponse<ResponseGetPaqueteData>> {
    return this.GET<ResponseGetPaqueteData>(
      `${this.base_url_production}/data/${idPaquete}`,
    );
  }

  public async actualizarPaquete(
    idPaquete: number,
    body: Partial<CreatePaquete> & { observacion?: string },
  ): Promise<BodyResponse<any>> {
    return this.PATCH<any>(
      `${this.base_url_production}/${idPaquete}`,
      body,
    );
  }

  public async obtenerProductosDelPaquete(
    idPaquete: number,
  ): Promise<BodyResponse<{ productos: any[], resumen: { totalPesoPaquete: number } }>> {
    return this.GET<{ productos: any[], resumen: { totalPesoPaquete: number } }>(
      `${this.base_url_production}/${idPaquete}/productos`,
    );
  }
}
