import type { BodyResponse, BodyResponseWithPagination } from "../types/bodyResponse.type"

export default class BaseRequestApi {
  public OFFLINE_MODE: boolean = false;
  public PRODUCTION_MODE: boolean = false;
  public token: string | null = localStorage.getItem('token');

  public async POST<T>(url: string, body: unknown ): Promise<BodyResponse<T>> {
    const response: Response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: (this.token) ? `bearer ${this.token}` : ``,
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }

  public async GET<T>(url: string): Promise<BodyResponseWithPagination<T> | BodyResponse<T>> {
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
    return response.json();
  }

  public async DELETE<T>(url: string): Promise<BodyResponse<T>> {
    const response: Response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${this.token}`
      }
    });
    return response.json();
  }

  public async PATCH<T>(url: string, body: unknown): Promise<BodyResponse<T>> {
    const response: Response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Authorization': `bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }
}