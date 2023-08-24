import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import Logger from "../utils/logger";

interface Config extends AxiosRequestConfig {
  status?: number;
  statusText?: string;
}

declare type HttpMethod = "get" | "post" | "put" | "delete";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}


export class HttpClient {
  private _httpClient;
  constructor() {
    this._httpClient = axios.create();
  }

  private async _invokeHttpRequest<T>(method: HttpMethod, url: string, args?: object) {
    const config: Config = {
      method,
      url,
      ...args,
    };
    try {
      const result = await this._httpClient.request<T, AxiosResponse<T>>(config);
      return result;
    } catch (error) {
      Logger.error(getErrorMessage(error));
      throw error;
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

export default new HttpClient();
