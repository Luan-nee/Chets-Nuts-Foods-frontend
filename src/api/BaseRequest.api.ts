export default class BaseRequestApi {
  public OFFLINE_MODE: boolean = false;
  public PRODUCTION_MODE: boolean = true;

  public async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    // Try to parse JSON when possible
    const looksLikeJson = contentType.includes('application/json') || text.trim().startsWith('{') || text.trim().startsWith('[');

    if (looksLikeJson) {
      try {
        const json = JSON.parse(text);
        // If server responded with error HTTP status but returned JSON body,
        // return the parsed JSON so callers can inspect `status`/`message` fields.
        return json as T;
      } catch (e) {
        if (!response.ok) {
          throw new Error(text || 'Error en la petición');
        }
        throw e;
      }
    }

    if (!response.ok) {
      throw new Error(text || 'Error en la petición');
    }

    // Non-JSON successful response: return raw text casted to T
    return text as unknown as T;
  }
}