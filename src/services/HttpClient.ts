import axios, { AxioInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
  constructor(httpClient: AxioInstance) {
     this._httpClient = httpClient;
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

export default new HttpClient(axios);




import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HttpClient from '../api/HttpClient'; // Adjust the import path
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For better assertions

describe('HttpClient', () => {
  let axiosMock: MockAdapter;
  let httpClientInstance: HttpClient;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    httpClientInstance = new HttpClient(axios); // Inject the axios instance
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('performs a GET request successfully', async () => {
    axiosMock.onGet('/api/resource').reply(200, { message: 'GET success' });

    const response = await httpClientInstance.get('/api/resource');

    expect(response.data.message).toEqual('GET success');
  });

  it('handles GET request failure', async () => {
    axiosMock.onGet('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClientInstance.get('/api/resource')).rejects.toThrowError(
      'Server error'
    );
  });

  it('performs a POST request successfully', async () => {
    const requestData = { data: 'Test data' };
    axiosMock.onPost('/api/resource').reply(200, { message: 'POST success' });

    const response = await httpClientInstance.post('/api/resource', requestData);

    expect(response.data.message).toEqual('POST success');
  });

  it('handles POST request failure', async () => {
    axiosMock.onPost('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClientInstance.post('/api/resource', {})).rejects.toThrowError(
      'Server error'
    );
  });

  it('performs a PUT request successfully', async () => {
    const requestData = { data: 'Updated data' };
    axiosMock.onPut('/api/resource').reply(200, { message: 'PUT success' });

    const response = await httpClientInstance.put('/api/resource', requestData);

    expect(response.data.message).toEqual('PUT success');
  });

  it('handles PUT request failure', async () => {
    axiosMock.onPut('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClientInstance.put('/api/resource', {})).rejects.toThrowError(
      'Server error'
    );
  });

  it('performs a DELETE request successfully', async () => {
    axiosMock.onDelete('/api/resource').reply(200, { message: 'DELETE success' });

    const response = await httpClientInstance.delete('/api/resource');

    expect(response.data.message).toEqual('DELETE success');
  });

  it('handles DELETE request failure', async () => {
    axiosMock.onDelete('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClientInstance.delete('/api/resource')).rejects.toThrowError(
      'Server error'
    );
  });
});


