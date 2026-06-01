
type methodoType = "POST" | "GET" | "PATCH" | "DELETE"


interface paramsType{
    key:string,
    valor:string
}

export interface getTypeConsulta{
    ruta:string,
    body:string,
    params?:paramsType[]
    token?:string
}

export class EmitConsultas {
  static async POST(ruta: string, body: string, token?: string) {
    const response: Response = await fetch(ruta, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `bearer ${token}` }),
      },
    });

    const response2 = await response.json();

    return response2;
  }

  static async GET({body,params,ruta,token}:getTypeConsulta) {
    let ruta2 = ruta;
    if(params !== undefined){
        ruta2 += "?"
        params.map(valor=>{
            return `${valor.key}=${valor.valor}`;
        }).join("&");

    }
    const response: Response = await fetch(ruta2, {
      method: "GET",
      body: body,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `bearer ${token}` }),
      },
    });

    const response2 = await response.json();

    return response2;
  }

  static async Consulta(
    ruta: string,
    methodo: methodoType,
    body: string,
    token?: string,
  ) {
    const response: Response = await fetch(ruta, {
      method: methodo,
      body: body,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `bearer ${token}` }),
      },
    });

    const response2 = await response.json();

    return response2;
  }
}