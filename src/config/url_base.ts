// usa la variables de entorno para la URL base del endpoint
export const url_base_postman: string = import.meta.env.VITE_URL_BASE_ENDPOINT_POSTMAN || 'https://95858b8a-f038-441a-9e94-48ca0994040c.mock.pstmn.io';
export const url_base_production: string = import.meta.env.VITE_URL_BASE_ENDPOINT_PRODUCTION || 'http://localhost:4000';