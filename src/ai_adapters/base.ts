export type ResponseContent = {
  text: string
}

export interface BaseAdapter {
  generateContent(input: string): Promise<ResponseContent>
  buildBody(input: string): object
}
