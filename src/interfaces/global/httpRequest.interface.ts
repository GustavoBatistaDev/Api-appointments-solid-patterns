export interface HttpRequest<T> {
  body?: T;
  params?: number | string;
  queryString?: { [key: string]: string | undefined };
}
