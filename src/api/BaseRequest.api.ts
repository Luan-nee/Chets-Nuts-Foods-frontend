// import 

export default class BaseRequestApi {
  public OFFLINE_MODE: boolean = false;
  public PRODUCTION_MODE: boolean = false;
  public token: string | null = localStorage.getItem('token');
}