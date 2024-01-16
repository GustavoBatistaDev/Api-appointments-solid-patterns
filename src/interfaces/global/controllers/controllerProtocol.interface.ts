import { HttpRequest } from "../http/httpRequest.interface";
import { HttpResponse } from "../http/httpResponse.interface";

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
