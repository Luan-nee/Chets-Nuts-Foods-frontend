export default class BaseRequestApi {
  public OFFLINE_MODE: boolean = false;
  public PRODUCTION_MODE: boolean = false;

  public async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    return response.json();
  }
}