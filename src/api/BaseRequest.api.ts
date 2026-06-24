import type { BodyResponse, BodyResponseWithPagination } from "../types/bodyResponse.type"

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type RequestOptions = {
  method: RequestMethod;
  body?: unknown;
  headers?: HeadersInit;
};

export default class BaseRequestApi {
  public OFFLINE_MODE: boolean = false;
  public PRODUCTION_MODE: boolean = false;
  public get token(): string | null {
    return localStorage.getItem('token');
  }

  protected redirectToLogin(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    window.location.replace('/login');
  }

  protected async request<T>(url: string, options: RequestOptions): Promise<T> {
    const headers: HeadersInit = {
      ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(this.token ? { Authorization: `bearer ${this.token}` } : {}),
      ...(options.headers ?? {}),
    };

    const response: Response = await fetch(url, {
      method: options.method,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      headers,
    });

    if (response.status === 401) {
      this.redirectToLogin();
    }
    const response2 = await response.json()
    console.log(response2);
    return response2;
  }

  public async POST<T>(url: string, body: unknown ): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(url, {
      method: 'POST',
      body,
    });
  }

  public async GET<T>(url: string): Promise<BodyResponseWithPagination<T> | BodyResponse<T>> {
    return this.request<BodyResponseWithPagination<T> | BodyResponse<T>>(url, {
      method: 'GET',
    });
  }

  public async DELETE<T>(url: string): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(url, {
      method: 'DELETE',
    });
  }

  public async PATCH<T>(url: string, body: unknown): Promise<BodyResponse<T>> {
    return this.request<BodyResponse<T>>(url, {
      method: 'PATCH',
      body,
    });
  }
}