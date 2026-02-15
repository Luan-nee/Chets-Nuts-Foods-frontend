export type Producto = {
  id: number;
  // bien_normalizado: false,
  codigo_del_bien: string,
  // codigo_subpartida_nacional: "", 
  codigo_producto_sunat: string,
  // codigo_gtin: "",
  descripcion_detallada_del_bien: string,
  unidad_de_medida_del_bien: string,
  cantidad: number
}