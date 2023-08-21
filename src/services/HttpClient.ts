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


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HttpClient } from './HttpClient';

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let axiosMock: MockAdapter;

  beforeEach(() => {
    httpClient = new HttpClient();
    axiosMock = new MockAdapter(httpClient.getInstance());
  });

  afterEach(() => {
    axiosMock.restore();
  });

  // Similar to the GET test, write tests for POST, PUT, and DELETE methods

  it('performs a GET request successfully', async () => {
    const responseData = { message: 'GET request successful' };
    axiosMock.onGet('/api/resource').reply(200, responseData);

    const response = await httpClient.get('/api/resource');

    expect(response.data).toEqual(responseData);
  });

  it('throws an error on GET request failure', async () => {
    axiosMock.onGet('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClient.get('/api/resource')).rejects.toThrowError(
      'Server error'
    );
  });

  
  it('performs a POST request successfully', async () => {
    const requestData = { data: 'Test data' };
    const responseData = { message: 'POST request successful' };
    axiosMock.onPost('/api/resource').reply(200, responseData);

    const response = await httpClient.post('/api/resource', requestData);

    expect(response.data).toEqual(responseData);
  });

  it('throws an error on POST request failure', async () => {
    axiosMock.onPost('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClient.post('/api/resource', {})).rejects.toThrowError(
      'Server error'
    );
  });

  it('performs a PUT request successfully', async () => {
    const requestData = { data: 'Updated data' };
    const responseData = { message: 'PUT request successful' };
    axiosMock.onPut('/api/resource').reply(200, responseData);

    const response = await httpClient.put('/api/resource', requestData);

    expect(response.data).toEqual(responseData);
  });

  it('throws an error on PUT request failure', async () => {
    axiosMock.onPut('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClient.put('/api/resource', {})).rejects.toThrowError(
      'Server error'
    );
  });

  it('performs a DELETE request successfully', async () => {
    const responseData = { message: 'DELETE request successful' };
    axiosMock.onDelete('/api/resource').reply(200, responseData);

    const response = await httpClient.delete('/api/resource');

    expect(response.data).toEqual(responseData);
  });

  it('throws an error on DELETE request failure', async () => {
    axiosMock.onDelete('/api/resource').reply(500, { errorMessage: 'Server error' });

    await expect(httpClient.delete('/api/resource')).rejects.toThrowError(
      'Server error'
    );
  });
});

import { getCuratedData } from './curatedData'; // Adjust the import path

describe('getCuratedData', () => {
  it('transforms data into curated format', () => {
    const input = [
      {
        date: '2023-08-18',
        value: {
          number: 42,
          display_text: 'Forty-Two',
        },
        otherProperty: 'abc',
      },
      // Add more series as needed
    ];

    const expectedOutput = [
      {
        x: '2023-08-18',
        y: 42,
        display_value: 'Forty-Two',
        otherProperty: 'abc',
      },
      // Add more expected transformed objects
    ];

    const curatedData = getCuratedData(input);

    expect(curatedData).toEqual(expectedOutput);
  });

  it('returns an empty array for falsy input', () => {
    const curatedData = getCuratedData(null);
    expect(curatedData).toEqual([]);
  });

  it('returns an empty array for non-object input', () => {
    const curatedData = getCuratedData('not an object');
    expect(curatedData).toEqual([]);
  });
});

describe('getCuratedData', () => {
  it('transforms data with missing value property', () => {
    const input = [
      {
        date: '2023-08-18',
        // No value property
        otherProperty: 'abc',
      },
      // Add more series as needed
    ];

    const expectedOutput = [
      {
        x: '2023-08-18',
        y: undefined, // Missing value, should be undefined
        display_value: undefined, // Missing display_text, should be undefined
        otherProperty: 'abc',
      },
      // Add more expected transformed objects
    ];

    const curatedData = getCuratedData(input);

    expect(curatedData).toEqual(expectedOutput);
  });

  it('transforms empty data array', () => {
    const input = [];

    const expectedOutput = [];

    const curatedData = getCuratedData(input);

    expect(curatedData).toEqual(expectedOutput);
  });

  it('transforms data with empty value', () => {
    const input = [
      {
        date: '2023-08-18',
        value: {
          number: null,
          display_text: '',
        },
        otherProperty: 'abc',
      },
      // Add more series as needed
    ];

    const expectedOutput = [
      {
        x: '2023-08-18',
        y: null,
        display_value: '',
        otherProperty: 'abc',
      },
      // Add more expected transformed objects
    ];

    const curatedData = getCuratedData(input);

    expect(curatedData).toEqual(expectedOutput);
  });

  it('handles mixed data types', () => {
    const input = [
      {
        date: '2023-08-18',
        value: {
          number: 42,
          display_text: 'Forty-Two',
        },
        otherProperty: 'abc',
      },
      'not an object', // Non-object input
      null, // Falsy input
    ];

    const expectedOutput = [
      {
        x: '2023-08-18',
        y: 42,
        display_value: 'Forty-Two',
        otherProperty: 'abc',
      },
      // Empty object for non-object input
      // Empty object for falsy input
    ];

    const curatedData = getCuratedData(input);

    expect(curatedData).toEqual(expectedOutput);
  });
});


