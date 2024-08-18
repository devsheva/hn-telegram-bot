export type ResponseContent = {
  text: string
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export abstract class BaseAdapter {
  protected abstract _apiKey: string
  protected abstract _baseUrl: string
  protected abstract _model: string

  abstract generateContent(input: string): Promise<ResponseContent>
  abstract buildBody(input: string): object
}
