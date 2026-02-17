type estadoGre = "entregado" | "en tránsito" | "pendiente";
import type { VehiculoGre } from "./vehiculo.type";

export type simpleGreType = {
  id: number;
  numero: string;
  clave: string;
  fecha_emision: string;
  hora: string;
  destinatario: {
    nombre_razonSocial: string;
    tipo_documento: string;
    numero_documento: string;
  };
  punto_de_partida: string;
  punto_de_llegada: string;
  estado: estadoGre;
};

export type DetailedGreType = {
  id_guia: number;
  clave: string;
  numero: string;
  fecha_emision: string;
  hora: string;
  remitente: {
    nombre_razonSocial: string;
    tipo_documento: string;
    numero_documento: string;
    direccion_fiscal: string;
  };
  destinatario: {
    nombre_razonSocial: string;
    tipo_documento: string;
    numero_documento: string;
    direccion_fiscal: string;
  };
  transporte: {
    conductor: {
      nombres: string;
      apellidos: string;
      numero_licencia: string;
    };
    empresa_transportista: {
      nombre_razonSocial: string;
      tipo_documento: string;
      numero_documento: string;
    };
    vehiculo: VehiculoGre
  };
  productos: {
    nombre: string;
    unidad_medida: string;
    peso_total: number;
    observacion: string;
  }[];
  resumen_carga: {
    cantidad_productos: number;
    peso_total: number;
  };
  estado: estadoGre;
  observacion: string;
};

export type GreFormData = {
  transportistaid: number;
  remitente: {
    tipo_documento: string;
    numero_documento: string;
    nombre_razonSocial: string;
  };
  destinatario: {
    tipo_documento: string;
    numero_documento: string;
    nombre_razonSocial: string;
  };
  bienes_transportados: {
    codigo_del_bien: string | "S/C";
    descripcion_detallada_del_bien: string;
    unidad_de_medida_del_bien: string;
    cantidad: number;
  }[];
  carga: {
    unidad_medida: "KILOGRAMO" | "TONELADA",
    peso_bruto_total: number;
  };
  
  transporte: {
    conductor: {
      nombres: string;
      apellidos: string;
      numero_licencia: string;
    };
    empresa_transportista: {
      nombre_razonSocial: string;
      tipo_documento: string;
      numero_documento: string;
    };
    vehiculo: VehiculoGre
  };
  estado: estadoGre;
  observacion: string;
}