
import { HttpRequest } from "./httpRequest.interface";
import { HttpResponse } from "./httpResponse.interface";

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
