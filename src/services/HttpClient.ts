import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface Config extends AxiosRequestConfig {
  status?: number;
  statusText?: string;
  method: HttpMethod;
}
declare type HttpMethod = "get" | "post" | "put" | "delete";

export class HttpClient {
  private _httpClient: AxiosInstance;
  constructor() {
    this._httpClient = axios.create();
  }

  private async _invokeHttpRequest<T>(
    method: HttpMethod,
    url: string,
    args: object | undefined
  ) {
    const config: Config = {
      method,
      url,
      ...args,
    };
    try {
      const result = await this._httpClient.request<T, AxiosResponse<T>>(
        config
      );
      return result;
    } catch (err: any | unknown) {
      throw err.response?.data?.errorMessage || err.response;
    }
  }

  public get<T>(url: string, args?: object) {
    return this._invokeHttpRequest<T>("get", url, args);
  }

  public post<T>(url: string, args?: object) {
    return this._invokeHttpRequest<T>("post", url, args);
  }

  public put<T>(url: string, args?: object) {
    return this._invokeHttpRequest<T>("put", url, args);
  }

  public delete<T>(url: string, args?: object) {
    return this._invokeHttpRequest<T>("delete", url, args);
  }
}

const httpClientInstance = new HttpClient();

export default httpClientInstance;
