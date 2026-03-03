export type BodyResponse<T> = {
  status: "success" | "warning" | "error" | "Z";
  message: string;
  data: T;
};

export type PaginationInfo = {
  total_data: number;
  total_paginas: number;
  pagina_actual: number;
  datos_por_pagina: number;
}

export type BodyResponseWithPagination<T> = BodyResponse<T> & {
  pagination: PaginationInfo;
};
