import { AxiosPromise } from "axios";
import httpClientInstance from "../services/HttpClient";

export const requestInvite = (name: string, email: string): AxiosPromise => {
  const response = httpClientInstance.post(
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
    { data: { name, email } }
  );
  return response;
};
